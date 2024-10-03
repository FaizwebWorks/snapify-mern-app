import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Link } from 'react-router-dom'
import { MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'

const CommentDialog = ({ open, setOpen }) => {
    const [text, setText] = useState("")

    const changeEventHandler = (e) => {
        const inputText = e.target.value
        if (inputText.trim()) {
            setText(inputText)
        } else {
            setText("")
        }
    }

    const addCommentHandler = async () => {
        alert(text)
    }

    return (
        <Dialog open={open}>
            <DialogContent onInteractOutside={() => setOpen(false)} className="max-w-5xl p-0 flex flex-col">
                <div className='flex flex-1'>
                    <div className='w-1/2'>
                        <img
                            src="https://images.unsplash.com/photo-1541331270253-b7cb940d4e1a?q=80&w=2865&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="post_img"
                            className='w-full h-full object-cover rounded-l-lg '
                        />
                    </div>
                    <div className='flex w-1/2 flex-col justify-between'>
                        <div className='flex items-center justify-between p-4'>
                            <div className='flex items-center gap-3'>
                                <Link>
                                    <Avatar>
                                        <AvatarImage src="" alt="post_img" />
                                        <AvatarFallback>U</AvatarFallback>
                                    </Avatar>
                                </Link>
                                <div>
                                    <Link><span className='font-semibold text-sm'>username</span></Link>
                                </div>
                                {/* <span className='text-slate-400 text-sm'>Caption here...</span> */}
                            </div>

                            {/*  Start from here  -------------  One more Dialog here  */}
                            <Dialog>
                                <DialogTrigger asChild>
                                    <MoreHorizontal className='cursor-pointer' />
                                </DialogTrigger>
                                <DialogContent className="flex items-center flex-col">
                                    <Button variant="ghost" className="w-fit text-red-500 font-semibold hover:text-red-500">Unfollow</Button>
                                    <Button variant="ghost" className="w-fit">Add to Favourite</Button>
                                </DialogContent>
                            </Dialog>
                        </div>
                        <hr />
                        <div className='flex-1 overflow-y-auto max-h-96 p-4'>
                            Comments will come here
                        </div>
                        <div className='p-4 flex items-center justify-between gap-4'>
                            <Input type="text" value={text} onChange={changeEventHandler} placeholder="Add a Comment..." className="" />
                            <Button variant="oultine" disabled={!text.trim()} onClick={addCommentHandler} className="border border-blue-500 px-5 text-blue-500 font-semibold">Add Comment</Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default CommentDialog


