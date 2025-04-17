'use client';
import NewUser from "@/components/NewUser";
import Table from "@/components/Table";
import { User } from "@/types/user";
import { useState } from "react";
import peopleData from './random-people-data';

function generateRandomString(length = 16) {
    // Define the characters to use (uppercase letters and numbers)
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    
    // Create a random string of the specified length
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      result += charset[randomIndex];
    }
    return result;
  }

export default function TablePage()  {
    const [data, setData] = useState<User[]>(peopleData.ctRoot)
  const handleSubmit = (user: User) => {
    const newUser: User = {
      ...user,
      _id: generateRandomString(),
    };
    setData(prevData => ([
      newUser,
      ...prevData,
    ]));
  }
  return (
    <main className="flex flex-col items-center text-black">
      <NewUser onSubmit={(user) => handleSubmit(user)}/>
      <Table data={data} isLoading={false}/>
    </main>
  );
};