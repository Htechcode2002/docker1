import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

// GET all users
export async function GET() {
    try {
        const users = await query('SELECT * FROM users');
        return NextResponse.json(users);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST new user
export async function POST(request: Request) {
    try {
        const { name, email } = await request.json();
        const result: any = await query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
        return NextResponse.json({ id: result.insertId, name, email }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// DELETE user (optional, for convenience if user passes id in body, but better to use [id] route)
export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        await query('DELETE FROM users WHERE id = ?', [id]);
        return NextResponse.json({ message: 'User deleted' });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
