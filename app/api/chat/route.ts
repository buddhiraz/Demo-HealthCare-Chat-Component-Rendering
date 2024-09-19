import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { message } = await req.json();

  try {
    // Forward the request to the Flask backend
    const backendResponse = await fetch('http://localhost:5000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),  // Forward the user input
    });

    const data = await backendResponse.json();  // Parse the backend response

    // Return the response back to the frontend
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error communicating with the Flask backend:', error);
    return NextResponse.json({ error: 'Failed to communicate with backend.' }, { status: 500 });
  }
}
