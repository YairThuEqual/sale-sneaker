import type { Control, FieldValues, Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

type FormInputype<T extends FieldValues> = {
    control: Control<T>,
    path: Path<T>,
    label: string,
    className?: string,
    placeholder?: string,
    type?: React.HTMLInputTypeAttribute
}

export default function AppFormInput<T extends FieldValues> ({control, path, label, className, placeholder, type}: FormInputype<T>) {
    return (
        <FormField
            control={control}
            name={path}
            render={({ field }) => {
                const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    if (type === "number") {
                        field.onChange(e.target.value === "" ? undefined : Number(e.target.value))
                    } else {
                        field.onChange(e.target.value)
                    }
                }

                return (
                    <FormItem className={className}>
                        <FormLabel className="text-gray-500">{label}</FormLabel>
                        <FormControl>
                            <Input
                                {...field}
                                type={type}
                                value={field.value ?? (type === "number" ? 0 : "")}
                                placeholder={placeholder}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )
            }}
        />
    )
}