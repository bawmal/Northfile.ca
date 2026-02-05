import { Download, ArrowLeft, Printer, Mail } from "lucide-react";

export default function NoticePreviewPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/notices" className="flex items-center gap-2 text-slate-600 hover:text-slate-900">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Notices</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border-2 border-slate-200 hover:border-slate-300 text-slate-700 rounded-lg font-semibold transition-colors">
              <Printer className="w-4 h-4" />
              Print
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border-2 border-slate-200 hover:border-slate-300 text-slate-700 rounded-lg font-semibold transition-colors">
              <Mail className="w-4 h-4" />
              Email
            </button>
            <button className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors">
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Notice Preview</h1>
          <p className="text-slate-500">Review your notice before downloading or serving to tenant</p>
        </div>

        {/* Toggle between N1 and N4 */}
        <div className="flex gap-4 mb-8">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold">
            N1 - Rent Increase
          </button>
          <button className="px-6 py-3 bg-slate-200 text-slate-700 rounded-lg font-semibold hover:bg-slate-300">
            N4 - Late Rent
          </button>
        </div>

        {/* N1 Form Preview */}
        <div className="bg-white rounded-xl shadow-2xl border-2 border-slate-200 overflow-hidden">
          {/* Official LTB Header */}
          <div className="bg-slate-100 border-b-2 border-slate-300 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">Form N1</h2>
                <p className="text-sm text-slate-600">Notice of Rent Increase</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-600 mb-1">Landlord and Tenant Board</p>
                <p className="text-xs text-slate-600">Residential Tenancies Act, 2006</p>
              </div>
            </div>
            <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-3">
              <p className="text-xs font-semibold text-yellow-900">
                ⚠️ This is a legal document. Serve this notice to your tenant at least 90 days before the rent increase takes effect.
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8 space-y-6">
            {/* Section 1: Property Information */}
            <div className="border-2 border-slate-200 rounded-lg p-6">
              <h3 className="font-bold text-slate-900 mb-4 text-lg">Rental Unit Address</h3>
              <div className="space-y-2 text-slate-700">
                <p><span className="font-semibold">Street Number and Name:</span> 123 Main Street</p>
                <p><span className="font-semibold">Unit/Suite:</span> Unit 201</p>
                <p><span className="font-semibold">City/Town:</span> Toronto</p>
                <p><span className="font-semibold">Province:</span> Ontario</p>
                <p><span className="font-semibold">Postal Code:</span> M5V 1A1</p>
              </div>
            </div>

            {/* Section 2: Tenant Information */}
            <div className="border-2 border-slate-200 rounded-lg p-6">
              <h3 className="font-bold text-slate-900 mb-4 text-lg">Tenant Name(s)</h3>
              <p className="text-slate-700">John Smith</p>
            </div>

            {/* Section 3: Landlord Information */}
            <div className="border-2 border-slate-200 rounded-lg p-6">
              <h3 className="font-bold text-slate-900 mb-4 text-lg">Landlord Information</h3>
              <div className="space-y-2 text-slate-700">
                <p><span className="font-semibold">Name:</span> Jane Landlord</p>
                <p><span className="font-semibold">Phone:</span> (416) 555-1234</p>
              </div>
            </div>

            {/* Section 4: Rent Increase Details */}
            <div className="border-2 border-blue-200 bg-blue-50 rounded-lg p-6">
              <h3 className="font-bold text-slate-900 mb-4 text-lg">Notice of Rent Increase</h3>
              
              <div className="bg-white rounded-lg p-4 mb-4">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Current Rent</p>
                    <p className="text-2xl font-bold text-slate-900">$2,000.00</p>
                    <p className="text-xs text-slate-500">per month</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">New Rent</p>
                    <p className="text-2xl font-bold text-green-700">$2,050.00</p>
                    <p className="text-xs text-slate-500">per month</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 mb-1">Increase</p>
                    <p className="text-2xl font-bold text-blue-700">$50.00</p>
                    <p className="text-xs text-slate-500">2.5%</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-slate-700">
                <p><span className="font-semibold">Date of this Notice:</span> February 4, 2025</p>
                <p><span className="font-semibold">Rent increase takes effect on:</span> May 5, 2025</p>
                <p className="text-sm text-slate-600 italic">(This is at least 90 days from the date of this notice)</p>
              </div>
            </div>

            {/* Section 5: Guideline Information */}
            <div className="border-2 border-green-200 bg-green-50 rounded-lg p-6">
              <h3 className="font-bold text-slate-900 mb-3 text-lg">Rent Increase Guideline</h3>
              <p className="text-sm text-slate-700 mb-3">
                The rent increase guideline for 2024 is <span className="font-bold">2.5%</span>.
              </p>
              <p className="text-sm text-slate-700 mb-3">
                ✓ This rent increase is <span className="font-bold text-green-700">within the guideline</span> and does not require approval from the Landlord and Tenant Board.
              </p>
              <div className="bg-white rounded-lg p-3 text-xs text-slate-600">
                <p className="font-semibold mb-2">Important Information:</p>
                <ul className="space-y-1 ml-4">
                  <li>• You must give at least 90 days notice before the rent increase takes effect</li>
                  <li>• The rent increase must be on the anniversary of the tenancy or first day of a month</li>
                  <li>• You cannot increase the rent more than once every 12 months</li>
                  <li>• The tenant has the right to dispute this increase at the Landlord and Tenant Board</li>
                </ul>
              </div>
            </div>

            {/* Section 6: Signature */}
            <div className="border-2 border-slate-200 rounded-lg p-6">
              <h3 className="font-bold text-slate-900 mb-4 text-lg">Landlord Signature</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-600 mb-2">Signature:</p>
                  <div className="border-b-2 border-slate-300 h-12"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-2">Print Name:</p>
                    <p className="font-semibold text-slate-900">Jane Landlord</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-2">Date:</p>
                    <p className="font-semibold text-slate-900">February 4, 2025</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4">
              <p className="text-xs text-slate-600 text-center">
                This notice was generated by Northfile. For more information about rent increases and tenant rights, 
                visit <span className="font-semibold">tribunalsontario.ca/ltb</span>
              </p>
            </div>
          </div>
        </div>

        {/* N4 Preview (Hidden by default, shown when N4 tab is clicked) */}
        <div className="bg-white rounded-xl shadow-2xl border-2 border-slate-200 overflow-hidden hidden">
          {/* Official LTB Header */}
          <div className="bg-slate-100 border-b-2 border-slate-300 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-1">Form N4</h2>
                <p className="text-sm text-slate-600">Notice to End a Tenancy Early for Non-payment of Rent</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-600 mb-1">Landlord and Tenant Board</p>
                <p className="text-xs text-slate-600">Residential Tenancies Act, 2006</p>
              </div>
            </div>
            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-3">
              <p className="text-xs font-semibold text-red-900">
                ⚠️ This is a legal document. This notice gives the tenant 14 days to pay the rent owing or move out.
              </p>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-8 space-y-6">
            {/* Section 1: Property Information */}
            <div className="border-2 border-slate-200 rounded-lg p-6">
              <h3 className="font-bold text-slate-900 mb-4 text-lg">Rental Unit Address</h3>
              <div className="space-y-2 text-slate-700">
                <p><span className="font-semibold">Street Number and Name:</span> 456 Oak Avenue</p>
                <p><span className="font-semibold">City/Town:</span> Ottawa</p>
                <p><span className="font-semibold">Province:</span> Ontario</p>
                <p><span className="font-semibold">Postal Code:</span> K1A 0B1</p>
              </div>
            </div>

            {/* Section 2: Tenant Information */}
            <div className="border-2 border-slate-200 rounded-lg p-6">
              <h3 className="font-bold text-slate-900 mb-4 text-lg">Tenant Name(s)</h3>
              <p className="text-slate-700">Sarah Johnson</p>
            </div>

            {/* Section 3: Arrears Details */}
            <div className="border-2 border-orange-200 bg-orange-50 rounded-lg p-6">
              <h3 className="font-bold text-slate-900 mb-4 text-lg">Rent Arrears</h3>
              
              <div className="bg-white rounded-lg p-4 mb-4">
                <table className="w-full text-sm">
                  <thead className="border-b-2 border-slate-200">
                    <tr className="text-left">
                      <th className="pb-2 font-semibold text-slate-700">Period</th>
                      <th className="pb-2 font-semibold text-slate-700">Rent Due</th>
                      <th className="pb-2 font-semibold text-slate-700">Amount Paid</th>
                      <th className="pb-2 font-semibold text-slate-700 text-right">Balance Owing</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700">
                    <tr className="border-b border-slate-100">
                      <td className="py-2">December 2024</td>
                      <td>$2,000.00</td>
                      <td>$0.00</td>
                      <td className="text-right font-semibold text-red-600">$2,000.00</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-2">January 2025</td>
                      <td>$2,000.00</td>
                      <td>$0.00</td>
                      <td className="text-right font-semibold text-red-600">$2,000.00</td>
                    </tr>
                    <tr className="font-bold border-t-2 border-slate-300">
                      <td className="py-2" colSpan={3}>Total Rent Arrears:</td>
                      <td className="text-right text-xl text-red-700">$4,000.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="space-y-3 text-slate-700">
                <p><span className="font-semibold">Date of this Notice:</span> January 15, 2025</p>
                <p><span className="font-semibold">Termination Date:</span> January 29, 2025</p>
                <p className="text-sm text-slate-600 italic">(This is at least 14 days from the date of this notice)</p>
              </div>
            </div>

            {/* Section 4: Payment Instructions */}
            <div className="border-2 border-blue-200 bg-blue-50 rounded-lg p-6">
              <h3 className="font-bold text-slate-900 mb-3 text-lg">What You Must Do</h3>
              <div className="bg-white rounded-lg p-4 space-y-3 text-sm text-slate-700">
                <p className="font-semibold">You have TWO options:</p>
                <div className="ml-4 space-y-2">
                  <p><span className="font-bold">Option 1:</span> Pay the full amount of <span className="font-bold text-red-700">$4,000.00</span> on or before <span className="font-bold">January 29, 2025</span></p>
                  <p><span className="font-bold">Option 2:</span> Move out of the rental unit on or before <span className="font-bold">January 29, 2025</span></p>
                </div>
                <p className="text-xs text-slate-600 mt-3 pt-3 border-t border-slate-200">
                  If you do not pay the full amount owing or move out by the termination date, the landlord can apply to the 
                  Landlord and Tenant Board for an order to evict you.
                </p>
              </div>
            </div>

            {/* Section 5: Signature */}
            <div className="border-2 border-slate-200 rounded-lg p-6">
              <h3 className="font-bold text-slate-900 mb-4 text-lg">Landlord Signature</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-600 mb-2">Signature:</p>
                  <div className="border-b-2 border-slate-300 h-12"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-2">Print Name:</p>
                    <p className="font-semibold text-slate-900">Jane Landlord</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-2">Date:</p>
                    <p className="font-semibold text-slate-900">January 15, 2025</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-50 border-2 border-slate-200 rounded-lg p-4">
              <p className="text-xs text-slate-600 text-center">
                This notice was generated by Northfile. For more information about eviction and tenant rights, 
                visit <span className="font-semibold">tribunalsontario.ca/ltb</span>
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <a href="/notices" className="flex-1 border-2 border-slate-200 hover:border-slate-300 text-slate-700 py-4 rounded-lg font-semibold transition-colors text-center">
            Edit Notice
          </a>
          <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            Download PDF
          </button>
        </div>
      </main>
    </div>
  );
}
