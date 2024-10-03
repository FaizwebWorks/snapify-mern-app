import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Dialog, DialogContent } from './ui/dialog'
import { DialogTrigger } from '@radix-ui/react-dialog'
import { MoreHorizontal } from 'lucide-react'
import { Button } from './ui/button'
import Like from '@/assets/svg/like.svg'
import Comment from '@/assets/svg/comment.svg'
import Share from '@/assets/svg/share.svg'
import Bookmark from '@/assets/svg/bookmark.svg'
import CommentDialog from './CommentDialog'
import { Input } from './ui/input'

const Post = () => {
  const [text, setText] = useState("")
  const [open, setOpen] = useState(false)

  const changeEventhandler = (e) => {
    const inputText = e.target.value
    if (inputText.trim()) {
      setText(inputText)
    } else {
      setText("")
    }
  }

  return (
    <div className='my-8 w-full max-w-sm mx-auto '>
      <div className='flex items-center justify-between'>
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="" alt='User Avatar' />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <p>username</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className='cursor-pointer' />
          </DialogTrigger>
          <DialogContent className="flex items-center flex-col text-center">
            <Button variant="ghost" className="w-fit text-red-500 hover:text-red-500 font-semibold">Unfollow</Button>
            <Button variant="ghost" className="w-fit">Add to Favourite</Button>
            <Button variant="ghost" className="w-fit">Cancel</Button>
          </DialogContent>
        </Dialog>
      </div>
      <img
        className='my-4 rounded-2xl w-full aspect-square object-cover'
        src="https://images.unsplash.com/photo-1541331270253-b7cb940d4e1a?q=80&w=2865&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="post_img" />

      <div className='flex w-full items-center justify-between'>
        <div className='flex items-center gap-3'>
          <img src={Like} alt="like" className='cursor-pointer h-7 w-7' />
          <img onClick={() => setOpen(true)} src={Comment} alt="comment" className='cursor-pointer' />
          <img src={Share} alt="share" className='cursor-pointer' />
        </div>
        <img src={Bookmark} alt="bookmark" className='cursor-pointer' />
      </div>
      <span className='text-sm font-medium'>256 Likes</span>
      <p className='text-sm'>
        <span className='font-medium mr-2'>username</span>
        caption
      </p>
      <span onClick={() => setOpen(true)} className='text-sm cursor-pointer text-slate-500'>View all 12 comments</span>
      <CommentDialog open={open} setOpen={setOpen} />
      <div className='flex items-center justify-between'>
        <Input
          className="border-zinc-300"
          type="text"
          placeholder="Add a Comment..."
          value={text}
          onChange={changeEventhandler}
        // On pressing enter Comment should be posted
        // onKeyPress={(e) => e.key === 'Enter' && setText("")}  

        />
        {
          text && (
            <span className='text-blue-500 font-medium ml-2 cursor-pointer'>Post</span>
          )
        }
      </div>
    </div>
  )
}

export default Post