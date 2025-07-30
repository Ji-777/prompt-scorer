'use client';

import React, { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const supabase = createClient(); // 🔧 确保你有 @/utils/supabase/client.ts 文件

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'http://localhost:3000', // ← 这里等会要配合 Supabase 后台配置
      },
    });

    if (error) {
      alert('Login failed: ' + error.message);
    } else {
      alert(`Magic link sent to ${email}`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Login</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="border px-2 py-1 mr-2"
      />
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-1">
        Send Magic Link
      </button>
    </div>
  );
}
