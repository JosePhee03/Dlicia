import { Html5QrcodeResult, Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "preact/hooks";



const qrcodeRegionId = "render"

const config = {
    fps: 10,
    qrbox: { width: 300, height: 150 },
    rememberLastUsedCamera: true,
}

interface CodebarScannerProps {
    onScanner: (code: string) => void
}

export function CodebarScanner({ onScanner }: CodebarScannerProps) {

    

    useEffect(() => {
        const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, false);

        const qrCodeSuccessCallback = (decodedText: string, result: Html5QrcodeResult) => {
            console.log(decodedText, result)
            onScanner(decodedText)
            html5QrcodeScanner.pause(true)
            
        }
    
        const qrCodeErrorCallback = (errorMessage: string) => {
            console.log(errorMessage)
        }

        html5QrcodeScanner.render(qrCodeSuccessCallback, qrCodeErrorCallback);

        return () => {
            html5QrcodeScanner.clear().catch(error => {
                console.error("Failed to clear html5QrcodeScanner. ", error);
            });
        };
    }, []);

    return (
        <div class=" w-60 sm:w-80" id={qrcodeRegionId} />
    );
}