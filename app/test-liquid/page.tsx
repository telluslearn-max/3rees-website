export default function TestLiquidPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-8 text-white">Liquid Glass Test</h1>
      
      {/* Test 1: Inline style (should work) */}
      <div 
        className="w-80 h-40 flex items-center justify-center text-white font-bold"
        style={{
          backdropFilter: 'blur(30px) saturate(180%)',
          background: 'rgba(255, 255, 255, 0.3)',
          borderRadius: '40px',
          border: '1px solid rgba(255,255,255,0.3)',
        }}
      >
        Inline Style (Should Work)
      </div>
      
      {/* Test 2: Tailwind class */}
      <div className="liquid-glass w-80 h-40 flex items-center justify-center text-apple-dark font-bold">
        Tailwind Class
      </div>
      
      {/* Test 3: Plain div for comparison */}
      <div className="w-80 h-40 bg-white/30 rounded-[40px] flex items-center justify-center text-apple-dark font-bold">
        Plain Div (No Blur)
      </div>
    </div>
  );
}