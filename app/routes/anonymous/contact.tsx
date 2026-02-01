import { House, Map, PhoneCall, Send } from "lucide-react";
import AppFooter from "~/components/custom/app-footer";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

export default function Contact () {
    return (
        <section>

            <div className="w-full h-[400px] bg-cover bg-center flex flex-col justify-center items-center text-white" style={{backgroundImage: "url('/app/image/contact.jpg')"}}>
                <h1 className="text-4xl underline">Contact Us</h1>

                <div className="mt-4 flex justify-center items-center gap-8">
                    <div className="w-[300px] h-[160px] flex justify-center items-center flex-col gap-6 rounded bg-gray-800 px-10 text-center">
                        <PhoneCall/>                    
                        <p>09-392039485, 09-397573829</p>
                    </div>
                    <div className="w-[300px] h-[160px] flex justify-center items-center flex-col gap-6 rounded bg-gray-800 px-10 text-center">
                        <House/>                    
                        <p>No.8-B, Thit Sar Road, Min Ga Lar TownShip</p>
                    </div>
                </div>
            </div>

            <div className="w-full h-[500px] flex flex-col lg:flex-row gap-4">
            <div className="flex-1 h-[400px] lg:h-auto">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30553.610121809583!2d96.09258481083985!3d16.816368599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30c1eb34335a92f5%3A0xea3210d0410309d7!2sTimes%20City%20Yangon!5e0!3m2!1sen!2smm!4v1766996221140!5m2!1sen!2smm"
                  className="w-full h-full"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Times City Yangon Map"
                ></iframe>
            </div>

                <div className="flex-1 flex flex-col justify-center p-4">
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">Contact Us</h2>
                  <form className="space-y-4 bg-white p-6 rounded-lg shadow-md">
                    {/* Name Field */}
                    <div className="flex flex-col space-y-1">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your Name" />
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col space-y-1">
                      <Label htmlFor="email">Email</Label>
                      <Input type="email" id="email" placeholder="Your Email" />
                    </div>

                    {/* Subject Field */}
                    <div className="flex flex-col space-y-1">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="Subject" />
                    </div>

                    {/* Message Field */}
                    <div className="flex flex-col space-y-1">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Your Message" rows={3} />
                    </div>

                    {/* Send Button */}
                    <Button type="submit" className="w-full mt-2 flex justify-center items-center cursor-pointer">
                        Send Message
                        <Send/>
                    </Button>
                  </form>
                </div>
            </div>


            <AppFooter/>
        </section>
    )
}