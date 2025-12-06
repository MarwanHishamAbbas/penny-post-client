"use client"

import * as React from "react"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,

} from "@/src/components/ui/command"
import { useSearch } from "../features/posts/hooks/use-post"
import { Button } from "./ui/button"
import { Loader2, Search } from "lucide-react"

export function SearchCommand() {
    const { mutate: generatePostIndex, data: indexedData, isPending } = useSearch()

    const [open, setOpen] = React.useState(false)
    console.log(indexedData)

    React.useEffect(() => {
        if (open) {

            generatePostIndex()
        }

    }, [generatePostIndex, open])

    return (
        <>
            <Button size={'icon-lg'} variant={'secondary'} onClick={() => setOpen(true)}><Search /></Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Search a post..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading={indexedData?.posts ? "Results" : "Suggestions"}>
                        {isPending || !indexedData ? <CommandItem >
                            <Loader2 className="animate-spin size-4 mx-auto" />
                        </CommandItem> : indexedData?.posts.map((post) => (
                            <CommandItem key={post.id}>
                                <p>{post.title}</p>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}
