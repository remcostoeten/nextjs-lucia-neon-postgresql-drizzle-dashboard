export default function AnimatedSpinner() {
    return (
        <div className="flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="animate-spin w-6 h-6">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4" className="opacity-25" />
                <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12a7.962 7.962 0 0114.666 5.291l-.512-.016zm9.254 2.318A7.962 7.962 0 0120 12a7.962 7.962 0 01-3.305-6.318l.528.017z" className="opacity-75" />
            </svg>
        </div>
    )
}
