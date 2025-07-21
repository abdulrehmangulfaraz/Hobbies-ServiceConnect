import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Links</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-gray-900 transition-colors">Resurser</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Priser</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Cases</a></li>
              <li><a href="#" className="hover:text-gray-900 transition-colors">Om os</a></li>
              <li><a href="/faq" className="hover:text-gray-900 transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Kontakt</h4>
            <ul className="space-y-2 text-gray-600">
              <li>info@hobbiies.dk</li>
              <li>+45 31 17 13 01</li>
              <li>Frederiksberg dk 1, 1719</li>
              <li>København</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Juridisk</h4>
            <ul className="space-y-2 flex flex-col text-gray-600">
              <a href="/resources/images/PrivacyPolicyDK.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">Privacy Policy(DK)</a>
              <a href="/resources/images/PrivacyPolicyEN.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">Privacy Policy(EN)</a>
              <a href="/resources/images/T&CHobbiiesDK.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">Terms of use(DK)</a>
              <a href="/resources/images/T&CHobbiiesEN.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">Terms of use(EN)</a>
            </ul>
          </div>
          
          <div>
            <div className="bg-black text-white p-4 rounded-lg">
              <div className="text-center">
                <div className="w-8 h-8 bg-white rounded mx-auto mb-2"></div>
                <div className="text-sm">📱</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
          <p>© 2024 Burst Creators - Bygger verden af creators</p>
          <div className="flex justify-center space-x-4 mt-4">
              <a href="/resources/images/PrivacyPolicyEN.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">Privacy Policy(EN)</a>
              <a href="/resources/images/T&CHobbiiesEN.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">Terms of use(EN)</a>
            <a href="#" className="hover:text-gray-900 transition-colors">CVR: 43845831</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;