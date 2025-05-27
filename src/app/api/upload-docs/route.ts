// app/api/upload-docs/route.ts
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import PDFParser from 'pdf2json';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const uploadedFiles = formData.getAll('filepond');

  let parsedText = '';
  let fileName = '';

  if (uploadedFiles.length > 1 && uploadedFiles[1] instanceof File) {
    const uploadedFile = uploadedFiles[1] as File;

    if (uploadedFile.type !== 'application/pdf') {
      console.log('❌ Invalid file format. Please upload a PDF.');
      return NextResponse.json({ error: 'Invalid file format. Upload a PDF.' }, { status: 400 });
    }

    const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());
    fileName = uuidv4();
    const tempPath = `/tmp/${fileName}.pdf`;

    await fs.writeFile(tempPath, fileBuffer);

    const pdfParser = new (PDFParser as any)(null, 1);

    await new Promise((resolve, reject) => {
      pdfParser.on('pdfParser_dataError', (err: any) => {
        console.error('❌ PDF Parse Error:', err.parserError);
        reject(err);
      });

      pdfParser.on('pdfParser_dataReady', () => {
        parsedText = (pdfParser as any).getRawTextContent();
        // console.log('📄 Parsed PDF Text:', parsedText);
        resolve(null);
      });

      pdfParser.loadPDF(tempPath);
    });

    return NextResponse.json({ text: parsedText });
  } else {
    console.log('❗ No valid file received.');
    return NextResponse.json({ error: 'No PDF file found.' }, { status: 400 });
  }
}
