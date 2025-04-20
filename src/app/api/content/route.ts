import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const fileName = searchParams.get('file');
    
    if (!fileName) {
      return NextResponse.json({ error: 'File name is required' }, { status: 400 });
    }
    
    // Sanitize file name to prevent directory traversal attacks
    const sanitizedFileName = path.basename(fileName);
    
    // Only allow specific files for security
    const allowedFiles = ['about.md', 'skills.md', 'experience.md', 'projects.md', 'contact.md'];
    if (!allowedFiles.includes(sanitizedFileName)) {
      return NextResponse.json({ error: 'File not allowed' }, { status: 403 });
    }
    
    // Get content directory path
    const contentDir = path.join(process.cwd(), 'src', 'content');
    const filePath = path.join(contentDir, sanitizedFileName);
    
    // Read file content
    const content = fs.readFileSync(filePath, 'utf-8');
    
    return NextResponse.json({ content });
  } catch (error) {
    console.error('Error reading file:', error);
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }
}
