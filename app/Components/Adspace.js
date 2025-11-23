export default function AdSpace() {
    return (
        <div className="h-24 md:h-32 w-full bg-muted/50 border-2 border-dashed border-border rounded-xl flex items-center justify-center">
            <div className="text-center text-muted-foreground">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="lucide lucide-eye h-8 w-8 mx-auto mb-2 opacity-50"
                >
                    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <p className="text-sm font-medium">Ad Space</p>
                <p className="text-xs">Google AdSense / Ezoic</p>
            </div>
        </div>
    );
}