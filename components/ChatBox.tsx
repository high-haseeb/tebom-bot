"use client";
import React, { useState } from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { BotMessageSquareIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { SendIcon } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { Separator } from './ui/separator';

const ChatBox = () => {
    const [messages, setMessages] = useState([
        { user: "bot", message: "Hi, how can i help you?" },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const sendMessage = () => {
        if (input.trim() === "") return;

        const newMessages = [...messages, { user: "user", message: input }];
        setMessages(newMessages);
        setInput("");
        setIsTyping(true);

        setTimeout(() => {
            setIsTyping(false);
            setMessages(prev => [...prev, { user: "bot", message: "This is a hardcoded response." }]);
        }, 1000);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className='fixed bottom-4 right-4'><BotMessageSquareIcon /></Button>
            </PopoverTrigger>
            <PopoverContent align='end' className='p-0 rounded-xl mb-2 w-[80vw]'>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-start gap-4 w-80'>
                        <Avatar>
                            <AvatarImage src='dp.png' alt='bot DP'></AvatarImage>
                        </Avatar>
                        <div className="flex flex-col text-left text-sm leading-tight">
                            <span className="truncate font-semibold text-base">Bot</span>
                            <span className="truncate text-xs text-secondary-foreground">Chat with our bot</span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Separator className='mb-4' />
                        <ScrollArea className='h-80 pr-4'>
                            <div className='flex flex-col items-start justify-start gap-2'>
                                {messages.map((message, index) => (
                                    <div
                                        key={index}
                                        className={`px-4 w-auto max-w-4/5 py-2 rounded-3xl text-wrap ${message.user === "bot" ? "bg-foreground text-background mr-4" : "self-end bg-primary text-background ml-4"}`}>
                                        {message.message}
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="px-4 py-2 rounded-full w-auto bg-background text-foreground">
                                        Bot is typing...
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                        <Input
                            type='text'
                            value={input}
                            placeholder='say something...'
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        />
                        <Button size='sm' className='rounded-md' onClick={sendMessage}>
                            <SendIcon />
                        </Button>
                    </CardFooter>
                </Card>
            </PopoverContent>
        </Popover>
    )
}

export default ChatBox;
