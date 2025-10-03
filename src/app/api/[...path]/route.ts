import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const resolvedParams = await params;
    const filePath = resolvedParams.path.join('/');
    console.log('🔍 API Route - Requested:', request.url, '| File path:', filePath);
    
    // If the request is for themes, we need to handle it specially
    const isThemesRequest = request.url.includes('/themes/');
    const actualFilePath = isThemesRequest ? filePath : filePath;
    
    // Try multiple possible paths - prioritize src/themes
    const possiblePaths = [
      join(process.cwd(), 'src', 'themes', actualFilePath),
      join(process.cwd(), 'src', 'themes', filePath),
      join(process.cwd(), 'public', 'themes', filePath),
      join(process.cwd(), 'src', 'style', filePath), // Fallback for old paths
      join(process.cwd(), 'public', 'style', filePath), // Fallback for old paths
      join(process.cwd(), 'src', filePath),
      join(process.cwd(), 'public', filePath),
      join(process.cwd(), 'public', 'images', filePath),
    ];
    
    let fullPath = '';
    let pathExists = false;
    
    for (const path of possiblePaths) {
      if (existsSync(path)) {
        fullPath = path;
        pathExists = true;
        console.log('✅ Found file at:', path);
        break;
      }
    }
    
    if (!pathExists) {
      console.log('❌ File not found:', filePath);
      return new NextResponse('File not found', { status: 404 });
    }
    
    const fileBuffer = await readFile(fullPath);
    
    // Determine content type based on file extension
    const ext = actualFilePath.split('.').pop()?.toLowerCase();
    let contentType = 'text/plain';
    
    switch (ext) {
      case 'css':
        contentType = 'text/css';
        break;
      case 'js':
        contentType = 'application/javascript';
        break;
      case 'jpg':
      case 'jpeg':
        contentType = 'image/jpeg';
        break;
      case 'png':
        contentType = 'image/png';
        break;
      case 'gif':
        contentType = 'image/gif';
        break;
      case 'svg':
        contentType = 'image/svg+xml';
        break;
      case 'ico':
        contentType = 'image/x-icon';
        break;
      case 'woff':
        contentType = 'font/woff';
        break;
      case 'woff2':
        contentType = 'font/woff2';
        break;
      case 'ttf':
        contentType = 'font/ttf';
        break;
      case 'eot':
        contentType = 'application/vnd.ms-fontobject';
        break;
    }
    
    return new NextResponse(fileBuffer as any, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    console.error('Error serving file:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
