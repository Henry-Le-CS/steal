import clsx from "clsx";
import { FC, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { useDebounce } from 'primereact/hooks';
import { InputText } from 'primereact/inputtext';

interface SearchProps {
    value?: string;
    wrapperClassName?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
}
export const Search: FC<SearchProps> = (props) => {
    const [inputValue, debouncedValue, setInputValue] = useDebounce(props?.value || '', 400);

    useEffect(() => {
        props.onChange?.(debouncedValue);
    }, [debouncedValue])

    return <div className={clsx([
        "w-full flex items-center px-2 py-2 bg-[#EEEEEE] border border-gray-300 rounded-md text-[#707070]",
        props.wrapperClassName
    ])}>
        <CiSearch size={20} className="w-[40px]" />
        <InputText
            className="w-[calc(100%-40px)] bg-inherit border-none outline-none shadow-none pr-2 text-[#707070]"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={props.placeholder || "Search"}
        />
    </div>
}