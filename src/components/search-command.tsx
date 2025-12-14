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
import { useSearchPosts } from "../features/posts/hooks/use-post"
import { Button } from "./ui/button"
import { Search } from "lucide-react"
import { useDebounce } from "../shared/hooks/use-debounce"
import Link from "next/link"
import { generateSlug } from "../shared/lib/utils"

export function SearchCommand() {
    const [open, setOpen] = React.useState(false)
    const [search, setSearch] = React.useState<string | undefined>('')
    const debouncedSearch = useDebounce(search, 400)
    const { data } = useSearchPosts({ search: debouncedSearch })

    return (
        <div>
            <Button size={'icon-sm'} variant={'secondary'} className="rounded-full" onClick={() => setOpen(true)}><Search /></Button>
            <CommandDialog open={open} onOpenChange={setOpen} >
                <CommandInput value={search} onValueChange={(e) => setSearch(e)} placeholder="Search a post..." />
                <CommandList>
                    {data?.posts.length === 0 && <CommandEmpty>No Results</CommandEmpty>}
                    {data && data?.posts?.length > 0 &&
                        <CommandGroup>
                            {(
                                data?.posts.map((post) => (
                                    <CommandItem key={post.id} value={post.title} className="flex flex-col gap-2 items-start">
                                        <Link className="w-full" href={`/posts/${generateSlug(post.title)}`}>
                                            <h3>{post.title}</h3>
                                            <p className="text-xs text-muted-foreground">Written by: <strong>{post.author_name}</strong></p>
                                        </Link>

                                    </CommandItem>
                                ))
                            )}
                        </CommandGroup>}
                </CommandList>
            </CommandDialog>
        </div>
    )
}
