    import type { Control, FieldValues, Path } from "react-hook-form";
    import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
    import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { string } from "zod";

    export type SelectOption = {
        label: string,
        value: number | string
    }

    type ValueType = "number" | "string";

    type FormSelectType<T extends FieldValues> = {
        control: Control<T>,
        path: Path<T>,
        label: string,
        selectedValue?: string,
        option: SelectOption[],
        valueType?: ValueType; // 👈 add this
        placeholder?: string,
        className?: string 
    }

    export default function AppFormSelect<T extends FieldValues>({control, path, label, option, selectedValue, valueType, placeholder, className}: FormSelectType<T>) {
        return (
            <FormField
            control={control}
            name={path}
            render={({ field }) => {

                const currentValue = field.value !== undefined && field.value !== null 
                    ? field.value : selectedValue ?? 0
                
                return (
                <FormItem className={className}>
                <FormLabel className="text-gray-500">{label}</FormLabel>
                <FormControl>
                    <Select
                      value={field.value !== undefined ? String(field.value) : ""}
                      onValueChange={(val) => {
                        if (valueType === "number") {
                          field.onChange(Number(val));
                        } else {
                          field.onChange(val);
                        }
                      }}
                    >
                    <SelectTrigger>
                        <SelectValue placeholder={placeholder ?? `Select ${label}`}/>
                    </SelectTrigger>
                    <SelectContent className="capitalize">
                        <SelectGroup>
                        <SelectItem value={valueType === "string" ? "all" : "0"} className="capitalize">
                            All {label}
                        </SelectItem>
                        {option.map((item) => (
                            <SelectItem key={item.value} value={item.value.toString()} className="capitalize">
                            {item.label.charAt(0).toUpperCase() + item.label.slice(1).toLowerCase()}
                            </SelectItem>
                        ))}
                        </SelectGroup>
                    </SelectContent>
                    </Select>
                </FormControl>
                <FormMessage/>
                </FormItem>
                )  
            }}
            />
        );
    }