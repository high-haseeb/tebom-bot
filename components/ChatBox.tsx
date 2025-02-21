import React from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { MessageSquareIcon, SendIcon } from 'lucide-react';
import { Input } from './ui/input';

const ChatBox = () => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className='absolute bottom-8 right-8'><MessageSquareIcon /></Button>
            </PopoverTrigger>
            <PopoverContent align='end' className='flex flex-col gap-4 mb-2'>
                <div className='bg-blue-600 px-4 py-2 rounded-md text-white'>
                    Hello
                </div>
                <div className='flex gap-2 items-center justify-center'>
                    <Input type='text' placeholder='chat with agent!' ></Input>
                    <Button size={'icon'} variant={'ghost'}><SendIcon /></Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default ChatBox
