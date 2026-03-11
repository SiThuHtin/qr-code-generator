import QrGenerator from "../components/QrGenerator";
import { CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import AdBanner from "../components/AdBanner";

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white dark:from-blue-950/20 dark:via-zinc-950 dark:to-zinc-950 flex flex-col justify-center relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-400/10 dark:bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[60%] rounded-full bg-orange-400/10 dark:bg-orange-600/10 blur-[120px]" />
      </div>

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-24 flex justify-center gap-4 xl:gap-8">
        
        {/* Main Content */}
        <div className="flex-1 max-w-7xl w-full mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* Left Column: Explanations & Hero */}
          <div className="flex-1 text-center lg:text-left animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              Silly QR - QR Code Generator
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
              Create Smart QR Codes <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500 dark:from-blue-400 dark:to-orange-400">
                In Seconds.
              </span>
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto lg:mx-0">
              Instantly generate high-quality QR codes for your URLs, text, or any file up to 10MB. Simply upload your file, scan the generated code, and access it anywhere.
            </p>

            {/* Features List */}
            <div className="space-y-6 text-left max-w-lg mx-auto lg:mx-0">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Lightning Fast</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">Files are uploaded instantly and securely to our cloud storage.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Seamless Previews</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">If you upload an image, iOS users can easily save it directly to their Photos app.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Auto-Expiring Links</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">For your privacy, all uploaded files are automatically deleted after 24 hours.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: The Generator Wrapper */}
          <div className="flex-1 w-full max-w-md lg:max-w-full flex justify-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
            <QrGenerator />
          </div>

          </div>

          {/* Mobile/Tablet Ad (Shows below content on smaller screens, hidden on desktop) */}
          <div className="xl:hidden mt-12 w-full">
            <AdBanner className="w-full" format="auto" />
          </div>
        </div>

        {/* Right Side Ad (Shows only on desktop) */}
        <aside className="hidden xl:block w-[160px] 2xl:w-[200px] flex-shrink-0">
          <div className="sticky top-24">
            <AdBanner className="w-full" format="vertical" />
          </div>
        </aside>

      </div>
    </div>
  );
}
