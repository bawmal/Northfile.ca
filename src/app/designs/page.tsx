import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function DesignsIndexPage() {
  const pages = [
    { name: "Landing Page", path: "/", description: "Main marketing page with waitlist form" },
    { name: "Login", path: "/login", description: "User authentication - email/password + Google OAuth" },
    { name: "Signup", path: "/signup", description: "User registration with role selection" },
    { name: "Dashboard", path: "/dashboard", description: "Main dashboard with stats and action items" },
    { name: "Transactions", path: "/transactions", description: "Transaction inbox with AI classification" },
    { name: "Receipts", path: "/receipts", description: "Receipt upload and AI matching interface" },
    { name: "Properties", path: "/properties", description: "Property management and portfolio overview" },
    { name: "Reports", path: "/reports", description: "T776 generation and export packs" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-5xl font-light text-slate-900 mb-4 inline-block" style={{ fontFamily: 'Georgia, "Times New Roman", serif', letterSpacing: '-0.02em' }}>
            Northfile
          </span>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Interface Designs</h1>
          <p className="text-slate-600">Click any page below to view the design mockups</p>
        </div>

        {/* Design Status */}
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <div>
              <h3 className="font-bold text-green-900">All Designs Complete!</h3>
              <p className="text-sm text-green-700">8 pages designed and ready to view</p>
            </div>
          </div>
        </div>

        {/* Pages Grid */}
        <div className="grid gap-4">
          {pages.map((page) => (
            <Link
              key={page.path}
              href={page.path}
              className="bg-white rounded-xl border-2 border-slate-200 p-6 hover:border-blue-500 hover:shadow-lg transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {page.name}
                  </h3>
                  <p className="text-slate-600 text-sm">{page.description}</p>
                  <p className="text-xs text-slate-400 mt-2 font-mono">{page.path}</p>
                </div>
                <ArrowRight className="w-6 h-6 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))}
        </div>

        {/* Design System Links */}
        <div className="mt-8 bg-white rounded-xl border-2 border-slate-200 p-6">
          <h3 className="font-bold text-slate-900 mb-4">Design Documentation</h3>
          <div className="space-y-2 text-sm">
            <p className="text-slate-600">
              📁 <span className="font-mono text-slate-900">DESIGN_SYSTEM.md</span> - Colors, typography, spacing
            </p>
            <p className="text-slate-600">
              📁 <span className="font-mono text-slate-900">INTERFACE_DESIGNS.md</span> - Complete interface overview
            </p>
          </div>
        </div>

        {/* Features Highlight */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="text-2xl mb-2">🤖</div>
            <h4 className="font-semibold text-purple-900 mb-1">AI Features</h4>
            <p className="text-xs text-purple-700">Auto-classification, OCR, smart matching</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="text-2xl mb-2">📊</div>
            <h4 className="font-semibold text-blue-900 mb-1">Dashboard</h4>
            <p className="text-xs text-blue-700">Stats, action items, activity feed</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="text-2xl mb-2">📄</div>
            <h4 className="font-semibold text-green-900 mb-1">T776 Forms</h4>
            <p className="text-xs text-green-700">CRA-compliant draft generation</p>
          </div>
        </div>
      </div>
    </div>
  );
}
