import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, List, LayoutGrid } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/MobileLayout';

const Schemes = ({ t }) => {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState('list');

    // Central Government Schemes - Key-based mapping
    const centralSchemes = [
        { id: 1, key: 'pm_kisan', desc: 'Pradhan Mantri Kisan Samman Nidhi', img: 'https://placehold.co/100x100?text=PMK', url: 'https://pmkisan.gov.in/' },
        { id: 2, key: 'pmfby', desc: 'Pradhan Mantri Fasal Bima Yojana', img: 'https://placehold.co/100x100?text=PMFBY', url: 'https://pmfby.gov.in/' },
        { id: 3, key: 'pmkmy', desc: 'PM Kisan Maandhan Yojana', img: 'https://placehold.co/100x100?text=KMY', url: 'https://maandhan.in/' },
        { id: 4, key: 'kcc', desc: 'Kisan Credit Card Scheme', img: 'https://placehold.co/100x100?text=KCC', url: 'https://kcc.pmkisan.gov.in/' },
        { id: 5, key: 'pmksy', desc: 'PM Krishi Sinchayee Yojana', img: 'https://placehold.co/100x100?text=KSY', url: 'https://pmksy.gov.in/' },
        { id: 6, key: 'shc', desc: 'Soil Health Card Scheme', img: 'https://placehold.co/100x100?text=SHC', url: 'https://soilhealth.dac.gov.in/' },
        { id: 7, key: 'pkvy', desc: 'Organic Farming (PKVY)', img: 'https://placehold.co/100x100?text=PKVY', url: 'https://pgsindia-ncof.dac.gov.in/' },
        { id: 8, key: 'enam', desc: 'National Agriculture Market', img: 'https://placehold.co/100x100?text=eNAM', url: 'https://www.enam.gov.in/' },
        { id: 9, key: 'pmaasha', desc: 'PM Annadata Aay SanraksHan Abhiyan', img: 'https://placehold.co/100x100?text=AASHA', url: 'https://agriwelfare.gov.in/en/Aasha' },
        { id: 10, key: 'drone_didi', desc: 'Namo Drone Didi Scheme', img: 'https://placehold.co/100x100?text=Drone', url: 'https://lakhpatididi.gov.in/power_to_empower/namo-drone-didi/' },
        { id: 11, key: 'aif', desc: 'Agriculture Infrastructure Fund', img: 'https://placehold.co/100x100?text=AIF', url: 'https://agriinfra.dac.gov.in/' },
        { id: 12, key: 'rkvy', desc: 'Rashtriya Krishi Vikas Yojana', img: 'https://placehold.co/100x100?text=RKVY', url: 'https://rkvy.da.gov.in/' },
        { id: 13, key: 'kisan_portal', desc: 'Kisan Suvidha Portal', img: 'https://placehold.co/100x100?text=Kisan', url: 'https://kisansuvidha.gov.in/' },
    ];

    // State Schemes - Key-based mapping
    const maharashtraSchemes = [
        { id: 101, key: 'namo_shetkari', desc: 'Namo Shetkari Sanman Nidhi', img: 'https://placehold.co/100x100?text=NS', url: 'https://nsmny.mahait.org/' },
        { id: 102, key: 'magel_tyala', desc: 'Magel Tyala Shettale Scheme', img: 'https://placehold.co/100x100?text=MTS', url: 'https://mahadbt.maharashtra.gov.in/' },
        { id: 103, key: 'ambedkar_yojana', desc: 'Ambedkar Krushi Swavalamban', img: 'https://placehold.co/100x100?text=AK', url: 'https://mahadbt.maharashtra.gov.in/' },
        { id: 104, key: 'shivaji_maharaj', desc: 'CSM Shetkari Sanman Yojana', img: 'https://placehold.co/100x100?text=CSM', url: 'https://csmssy.in/' },
        { id: 105, key: 'mahadbt', desc: 'MahaDBT Farmer Subsidies', img: 'https://placehold.co/100x100?text=DBT', url: 'https://mahadbt.maharashtra.gov.in/' },
        { id: 106, key: 'munde_vima', desc: 'Gopinath Munde Shetkari Vima', img: 'https://placehold.co/100x100?text=GMV', url: 'https://mahadbt.maharashtra.gov.in/' },
        { id: 107, key: 'sharad_pawar', desc: 'Sharad Pawar Gram Samridhi', img: 'https://placehold.co/100x100?text=SPG', url: 'https://egs.maharashtra.gov.in/' },
        { id: 108, key: 'fundkar_orchard', desc: 'Bhausaheb Fundkar Horticulture', img: 'https://placehold.co/100x100?text=BF', url: 'https://mahadbt.maharashtra.gov.in/' },
        { id: 109, key: 'pocra', desc: 'Nanaji Deshmukh Krishi Sanjivani', img: 'https://placehold.co/100x100?text=PoCRA', url: 'https://mahapocra.gov.in/' },
        { id: 110, key: 'pashudhan', desc: 'Mukhyamantri Pashudhan Sanvardhan', img: 'https://placehold.co/100x100?text=MPS', url: 'https://ahd.maharashtra.gov.in/' },
    ];

    const SchemeCard = ({ scheme }) => (
        <a
            href={scheme.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden active:scale-95 transition-transform ${viewMode === 'list' ? 'flex p-3 gap-3' : 'flex flex-col p-3 text-center'}`}
        >
            <img
                src={scheme.img}
                alt={t(scheme.key)}
                className={`${viewMode === 'list' ? 'w-14 h-14 rounded-xl' : 'w-16 h-16 rounded-full mx-auto mb-2'} object-contain bg-gray-50`}
            />
            <div className="flex-1 text-left">
                <h3 className="font-bold text-gray-800 text-xs leading-tight">{t(scheme.key)}</h3>
                <p className="text-[9px] text-gray-400 mt-1 line-clamp-1">{scheme.desc}</p>
                <span className="inline-flex items-center gap-1 mt-2 text-[9px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                    Apply Online <ExternalLink size={10} />
                </span>
            </div>
        </a>
    );

    return (
        <MobileLayout t={t}>
            <div className="flex items-center justify-between mb-6 px-1">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm">
                        <ArrowLeft size={20} className="text-gray-600" />
                    </button>
                    <h1 className="text-xl font-black text-gray-800">{t('govt_schemes')}</h1>
                </div>

                <div className="flex bg-gray-200 p-1 rounded-xl">
                    <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-lg ${viewMode === 'list' ? 'bg-white shadow-sm text-green-700' : 'text-gray-500'}`}>
                        <List size={18} />
                    </button>
                    <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-lg ${viewMode === 'grid' ? 'bg-white shadow-sm text-green-700' : 'text-gray-500'}`}>
                        <LayoutGrid size={18} />
                    </button>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 px-1 border-l-4 border-orange-500 pl-3">
                    {t('state_schemes')}
                </h2>
                <div className={viewMode === 'list' ? 'space-y-3 px-1' : 'grid grid-cols-2 gap-3 px-1'}>
                    {maharashtraSchemes.map(s => <SchemeCard key={s.id} scheme={s} />)}
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4 px-1 border-l-4 border-blue-500 pl-3">
                    {t('central_schemes')}
                </h2>
                <div className={viewMode === 'list' ? 'space-y-3 px-1' : 'grid grid-cols-2 gap-3 px-1'}>
                    {centralSchemes.map(s => <SchemeCard key={s.id} scheme={s} />)}
                </div>
            </div>
        </MobileLayout>
    );
};

export default Schemes;