import { useState, useEffect, type ChangeEvent } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Avatar, AvatarImage } from "~/components/ui/avatar";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { Image, Save } from "lucide-react";
import AppFormInput from "~/components/custom/app-form-input";
import AppFormTextarea from "~/components/custom/app-form-textarea";
import { MemberProfileSchema, type MemberProfileForm } from "~/lib/model/input/m-profile";
import type { MemberProfile } from "~/lib/model/products/output/member-profile";
import { MemberProfileEdit, MemberProfileView } from "~/lib/client/member-product-client";
import { useNavigate } from "react-router";

export default function AppProfileEdit() {
  const navigate = useNavigate();

  const [preview, setPreview] = useState<string>("");
  const [profile, setProfile] = useState<MemberProfile | null>(null);

  const form = useForm<MemberProfileForm>({
    resolver: zodResolver(MemberProfileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      image: "",
    },
  });

  /* ============================
     Load profile & reset form
     ============================ */
  useEffect(() => {
    async function load() {
      const response = await MemberProfileView();
      setProfile(response);

      form.reset({
        name: response.name,
        email: response.email,
        phone: response.phone,
        address: response.address,
        image: response.profileImage,
      });

      if (response.profileImage) {
        setPreview(response.profileImage);
      }
    }
    load();
  }, [form]);

  /* ============================
     Handle image change
     ============================ */
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPreview(base64);
      form.setValue("image", base64, { shouldDirty: true });
    };
    reader.readAsDataURL(file);
  };

  /* ============================
     Submit
     ============================ */
  const onSubmit = async (data: MemberProfileForm) => {
    // If image is empty, remove it from payload
    const payload: MemberProfileForm = {
      ...data,
      image: data.image && data.image.trim() !== "" ? data.image : undefined as any,
    };

    const response = await MemberProfileEdit(payload);

    console.log(payload);
    if (response.success) {
      alert("Profile updated successfully!");
      navigate("/member/profile");
    }
  };

  return (
    <div className="mt-20 mb-10 max-w-3xl mx-auto px-4">
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Avatar */}
              <div className="flex flex-col items-start gap-2">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={preview || "/app/image/default-profile.png"}
                    alt="Profile"
                    className="object-cover object-top"
                  />
                </Avatar>

                <Input
                  type="file"
                  accept="image/*"
                  id="profileImage"
                  className="hidden"
                  onChange={handleImageChange}
                />

                <Label
                  htmlFor="profileImage"
                  className="flex items-center gap-2 text-sm cursor-pointer rounded-md bg-gray-900 text-white px-4 py-2 hover:bg-gray-700 transition"
                >
                  <Image size={18} /> Upload Photo
                </Label>
              </div>

              <AppFormInput control={form.control} path="name" label="Name" />
              <AppFormInput control={form.control} path="email" label="Email" />
              <AppFormInput control={form.control} path="phone" label="Phone Number" />
              <AppFormTextarea control={form.control} path="address" label="Address" />

              <div className="flex justify-end">
                <Button type="submit" className="rounded-full px-6">
                  <Save className="mr-2" size={18} /> Save Profile
                </Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}
