"use client"

export default function ClassifierDiagram() {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border bg-white">
      <svg viewBox="0 0 880 680" className="mx-auto block min-w-[700px]" xmlns="http://www.w3.org/2000/svg">
        {/* Title */}
        <text x="440" y="30" textAnchor="middle" fontSize="22" fontWeight="600" fill="#1e1e1e">Free-Response Classification</text>
        <text x="440" y="52" textAnchor="middle" fontSize="13" fill="#757575">How Glean classifies misconceptions without answer choices</text>

        {/* === MARCUS INPUT === */}
        <rect x="30" y="80" width="270" height="165" rx="12" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1" />
        <text x="45" y="100" fontSize="10" fontWeight="600" fill="#2563eb" letterSpacing="0.08em">MARCUS TYPES IN CANVAS</text>
        <text x="45" y="125" fontSize="15" fontWeight="500" fill="#1e1e1e">Solve: x² + 6x + 9 = 0</text>
        <text x="45" y="152" fontSize="14" fill="#555">(x+3)(x+3) = 0</text>
        <text x="45" y="175" fontSize="14" fill="#555">x + 3 = 0</text>
        <text x="45" y="202" fontSize="17" fontWeight="700" fill="#ef4444">x = 3</text>
        <text x="195" y="234" fontSize="10" fill="#ef4444">✗ wrong sign</text>

        {/* === REFERENCE SOLUTION === */}
        <rect x="30" y="275" width="270" height="140" rx="12" fill="#dcfce7" stroke="#86efac" strokeWidth="1" />
        <text x="45" y="295" fontSize="10" fontWeight="600" fill="#15803d" letterSpacing="0.08em">REFERENCE SOLUTION</text>
        <text x="45" y="322" fontSize="14" fill="#555">(x+3)(x+3) = 0</text>
        <text x="45" y="345" fontSize="14" fill="#555">x + 3 = 0</text>
        <text x="45" y="375" fontSize="17" fontWeight="700" fill="#15803d">x = −3</text>
        <text x="195" y="404" fontSize="10" fill="#15803d">✓ correct</text>

        {/* === Arrow: Marcus → Extract === */}
        <line x1="300" y1="160" x2="380" y2="160" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrowPurple)" />

        {/* === STAGE 1: EXTRACT === */}
        <rect x="385" y="130" width="170" height="55" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2" />
        <text x="470" y="155" textAnchor="middle" fontSize="15" fontWeight="600" fill="#1e1e1e">1. EXTRACT</text>
        <text x="470" y="172" textAnchor="middle" fontSize="10" fill="#757575">LLM parses typed work</text>
        <text x="390" y="205" fontSize="11" fill="#757575">Parses into structured steps</text>

        {/* Arrow: Extract → Compare */}
        <line x1="470" y1="185" x2="470" y2="230" stroke="#757575" strokeWidth="2" markerEnd="url(#arrowGray)" />

        {/* === STAGE 2: COMPARE === */}
        <rect x="385" y="230" width="170" height="55" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2" />
        <text x="470" y="255" textAnchor="middle" fontSize="15" fontWeight="600" fill="#1e1e1e">2. COMPARE</text>
        <text x="470" y="272" textAnchor="middle" fontSize="10" fill="#757575">Student vs. reference</text>
        <text x="390" y="305" fontSize="11" fill="#757575">Aligns steps, finds divergence</text>

        {/* Arrow: Reference → Compare (dashed) */}
        <line x1="300" y1="345" x2="385" y2="270" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="5,3" markerEnd="url(#arrowGreen)" />

        {/* Arrow: Compare → Divergence */}
        <line x1="470" y1="285" x2="470" y2="330" stroke="#757575" strokeWidth="2" markerEnd="url(#arrowGray)" />

        {/* === DIVERGENCE BOX === */}
        <rect x="385" y="330" width="170" height="42" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
        <text x="470" y="350" textAnchor="middle" fontSize="11" fontWeight="600" fill="#ef4444">⚠ DIVERGENCE</text>
        <text x="470" y="365" textAnchor="middle" fontSize="12" fontWeight="500" fill="#1e1e1e">Step 3: +3 not −3</text>

        {/* Arrow: Divergence → Classify */}
        <line x1="470" y1="372" x2="470" y2="420" stroke="#757575" strokeWidth="2" markerEnd="url(#arrowGray)" />

        {/* === STAGE 3: CLASSIFY === */}
        <rect x="385" y="420" width="170" height="55" rx="10" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2" />
        <text x="470" y="445" textAnchor="middle" fontSize="15" fontWeight="600" fill="#1e1e1e">3. CLASSIFY</text>
        <text x="470" y="462" textAnchor="middle" fontSize="10" fill="#757575">Match to ontology</text>

        {/* === ONTOLOGY BOX === */}
        <rect x="30" y="440" width="270" height="160" rx="12" fill="#fef9c3" stroke="#f59e0b" strokeWidth="1" />
        <text x="45" y="460" fontSize="10" fontWeight="600" fill="#b45309" letterSpacing="0.08em">MISCONCEPTION ONTOLOGY</text>
        <circle cx="52" cy="485" r="4" fill="#f59e0b" />
        <text x="65" y="489" fontSize="13" fontWeight="500" fill="#1e1e1e">Research literature</text>
        <text x="65" y="504" fontSize="10" fill="#757575">Decades of cataloged error patterns</text>
        <circle cx="52" cy="525" r="4" fill="#f59e0b" />
        <text x="65" y="529" fontSize="13" fontWeight="500" fill="#1e1e1e">Pilot teacher annotations</text>
        <text x="65" y="544" fontSize="10" fill="#757575">Hundreds of labeled student responses</text>
        <circle cx="52" cy="565" r="4" fill="#f59e0b" />
        <text x="65" y="569" fontSize="13" fontWeight="500" fill="#1e1e1e">Teacher override feedback</text>
        <text x="65" y="584" fontSize="10" fill="#757575">Continuous refinement from classrooms</text>

        {/* Arrow: Ontology → Classify */}
        <line x1="300" y1="490" x2="385" y2="450" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrowAmber)" />

        {/* Arrow: Classify → Result */}
        <line x1="555" y1="447" x2="640" y2="447" stroke="#22c55e" strokeWidth="2" markerEnd="url(#arrowGreen)" />

        {/* === CLASSIFICATION RESULT === */}
        <rect x="645" y="400" width="200" height="110" rx="12" fill="#dcfce7" stroke="#22c55e" strokeWidth="2" />
        <text x="660" y="420" fontSize="10" fontWeight="600" fill="#15803d" letterSpacing="0.08em">CLASSIFICATION</text>
        <text x="660" y="448" fontSize="18" fontWeight="700" fill="#1e1e1e">Sign inversion</text>
        <text x="660" y="472" fontSize="14" fontWeight="500" fill="#15803d">Confidence: 85%</text>
        <text x="660" y="498" fontSize="11" fill="#757575">Divergence at step 3</text>

        {/* Arrow: Result → Brief */}
        <line x1="745" y1="510" x2="745" y2="555" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrowBlue)" />

        {/* === BRIEF OUTPUT === */}
        <rect x="645" y="555" width="200" height="50" rx="10" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2" />
        <text x="745" y="577" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1e1e1e">Monday Brief</text>
        <text x="745" y="595" textAnchor="middle" fontSize="11" fill="#3b82f6">Delivered in Canvas</text>

        {/* === FEEDBACK LOOP (dashed) === */}
        <path d="M 645 400 C 600 380, 500 380, 470 420" fill="none" stroke="#b0b0b0" strokeWidth="1" strokeDasharray="4,3" markerEnd="url(#arrowLight)" />
        <text x="540" y="378" fontSize="9" fill="#b0b0b0" textAnchor="middle">overrides retrain</text>

        {/* Arrow markers */}
        <defs>
          <marker id="arrowPurple" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#8b5cf6" />
          </marker>
          <marker id="arrowGray" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#757575" />
          </marker>
          <marker id="arrowGreen" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#22c55e" />
          </marker>
          <marker id="arrowAmber" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#f59e0b" />
          </marker>
          <marker id="arrowBlue" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#3b82f6" />
          </marker>
          <marker id="arrowLight" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#b0b0b0" />
          </marker>
        </defs>
      </svg>
    </div>
  )
}
