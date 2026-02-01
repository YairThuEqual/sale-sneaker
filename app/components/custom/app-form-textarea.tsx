import type { Control, FieldValues, Path } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Textarea } from "../ui/textarea"

type FormTextarea<T extends FieldValues> = {
    control: Control<T>,
    path: Path<T>,
    label: string,
    className?: string,
    placeholder?: string
}

export default function AppFormTextarea<T extends FieldValues> ({control, path, label, className, placeholder}: FormTextarea<T>) {
    return (
        <FormField  control={control} name={path} render={({field}) => (
            <FormItem className={className}>
                <FormLabel className="text-gray-500">{label}</FormLabel>
                <FormControl>
                    <Textarea {...field} placeholder={placeholder} className="h-24"></Textarea>
                </FormControl>
                <FormMessage/>
            </FormItem>
        )}/>
    )
}