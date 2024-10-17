'use client'
import React from 'react'
import { FormControl, FormField, FormItem, FormLabel, FormDescription, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Control, Field } from 'react-hook-form'
import { FormFieldType } from './forms/PatientForm'
import Image from 'next/image'
import 'react-phone-number-input/style.css'
import PhoneInput, { type Value } from 'react-phone-number-input'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


interface CustomProps {
    control: Control<any>,
    fieldType: FormFieldType,
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?: boolean,
    dateFormat?: string,
    showTimeSelect?: boolean,
    children?: React.ReactNode,
    renderSkeleton?: (field: any) => React.ReactNode
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
    const { fieldType, iconSrc, iconAlt, placeholder, showTimeSelect, dateFormat, renderSkeleton } = props
    switch (fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className="flex rounded-md border-dark-500 bg-dark-400">
                    {/* <Input {...field} {...props} /> */}
                    {iconSrc && (
                        <Image
                            src={iconSrc}
                            alt={iconAlt || 'icon'}
                            width={24}
                            height={24}
                            className='ml-2'
                        />
                    )}
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            {...field}
                            className='shad-0 border-0'
                        />
                    </FormControl>
                </div>
            );
        case FormFieldType.CHECKBOX:
            return (
                <FormItem>
                    <FormLabel>
                        <Input {...field} type="checkbox" />
                    </FormLabel>
                    <FormMessage className="shad-error" />
                </FormItem>
            )
        case FormFieldType.TEXTAREA:
            return <Input {...field} {...props} type="textarea" />
        case FormFieldType.PHONE_INPUT:
            return (
                <FormControl>
                    <PhoneInput
                        defaultCountry='US'
                        placeholder={placeholder}
                        international
                        withCountryCallingCode
                        value={field.value as Value | undefined}
                        onChange={field.onChange}
                        className='input-phone'
                    />
                </FormControl>
            )
        case FormFieldType.DATE_PICKER:
            return (
                <div className='flex rounded-md border border-dark-500 bg-dark-400'>
                    <Image
                        src="/assets/icons/calendar.svg"
                        height={24}
                        width={24}
                        alt='calendar'
                        className='ml-2'
                    />
                    <FormControl>
                        <DatePicker
                            selected={field.value}
                            onChange={(date) => (field.onChange(date))}
                            dateFormat={dateFormat ?? 'MM/DD/YYYY'}
                            showTimeSelect={showTimeSelect ?? false}
                            timeInputLabel='Time:'
                            wrapperClassName="date-picker"
                        />
                    </FormControl>
                </div>
            )
        case FormFieldType.SKELETON:
            return renderSkeleton ? renderSkeleton(field) : null
        case FormFieldType.FILE_UPLOAD:
            return <Input {...field} {...props} type="file" />
    }
}

const CustomFormField = (props: CustomProps) => {
    const { control, fieldType, name, label } = props
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className='flex-1'>
                    {fieldType !== FormFieldType.CHECKBOX && label && (
                        <FormLabel>{label}</FormLabel>
                    )}
                    <RenderField field={field} props={props} />
                    <FormMessage className="shad-error" />


                </FormItem>
            )}
        />
    )
}

export default CustomFormField