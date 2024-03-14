"use client";
import React, { FC, HTMLAttributes, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type props = {
	prompt: string,
	options: string[],
	setValueProp?: (arg0: string) => void,
} & HTMLAttributes<HTMLDivElement>;

const ComboBox : FC<props> = (props : props) => {
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState("")
	
	const setValueWithProp = (arg : string) => {
		setValue(arg);
		if (props.setValueProp) {
			props.setValueProp(arg);
		}
	}

	let options : string[] = props.options;
	let prompt : string = props.prompt;

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className={ `w-[200px] justify-between shadow-sm ${props.className}` }
					id={props.id}
				>
					{value
						? options.find((option) => option.toUpperCase() === value.toUpperCase())
						: prompt }
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="p-0">
				<Command>
					<CommandInput placeholder="Search..." />
					<CommandEmpty>Not found</CommandEmpty>
					<CommandGroup>
						{options.map((option) => (
							<CommandItem
								key={option}
								value={option}
								onSelect={(currentValue) => {
									setValueWithProp(currentValue)
									setOpen(false)
								}}
							>
								<Check
									className={cn(
										"mr-2 h-4 w-4",
										value === option ? "opacity-100" : "opacity-0"
									)}
								/>
								{option}
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

export default ComboBox;