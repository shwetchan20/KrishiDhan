import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, List, LayoutGrid } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/MobileLayout';

const Schemes = ({ t }) => {
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState('list');

    // --- 1. Central Government Schemes Data ---
    const centralSchemes = [
        { id: 1, name: t('pm_kisan'), desc: 'Pradhan Mantri Kisan Samman Nidhi', img: 'https://placehold.co/100x100?text=PMK', url: 'https://pmkisan.gov.in/' },
        { id: 2, name: t('pmfby'), desc: 'Pradhan Mantri Fasal Bima Yojana', img: 'https://placehold.co/100x100?text=PMFBY', url: 'https://pmfby.gov.in/' },
        { id: 3, name: t('pmkmy'), desc: 'PM Kisan Maandhan Yojana (Pension)', img: 'https://placehold.co/100x100?text=KMY', url: '#' },
        { id: 4, name: t('kcc'), desc: 'Kisan Credit Card Scheme', img: 'https://placehold.co/100x100?text=KCC', url: '#' },
        { id: 5, name: t('pmksy'), desc: 'PM Krishi Sinchayee Yojana', img: 'https://placehold.co/100x100?text=KSY', url: '#' },
        { id: 6, name: t('shc'), desc: 'Soil Health Card Scheme', img: 'https://placehold.co/100x100?text=SHC', url: '#' },
        { id: 7, name: t('pkvy'), desc: 'Paramparagat Krishi Vikas Yojana', img: 'https://placehold.co/100x100?text=PKVY', url: '#' },
        { id: 8, name: t('enam'), desc: 'National Agriculture Market', img: 'https://placehold.co/100x100?text=eNAM', url: 'https://www.enam.gov.in/' },
        { id: 9, name: t('pmaasha'), desc: 'PM Annadata Aay SanraksHan Abhiyan', img: 'https://placehold.co/100x100?text=AASHA', url: '#' },
        { id: 10, name: t('drone_didi'), desc: 'Namo Drone Didi Scheme', img: 'https://placehold.co/100x100?text=Drone', url: '#' },
        { id: 11, name: t('aif'), desc: 'Agriculture Infrastructure Fund', img: 'https://placehold.co/100x100?text=AIF', url: '#' },
        { id: 12, name: t('rkvy'), desc: 'Rashtriya Krishi Vikas Yojana', img: 'https://placehold.co/100x100?text=RKVY', url: '#' },
    ];

    // --- 2. Maharashtra State Government Schemes Data ---
    const maharashtraSchemes = [
        { id: 101, name: t('namo_shetkari'), desc: 'Namo Shetkari Mahasanman Nidhi', img: 'https://placehold.co/100x100?text=NS', url: '#' },
        { id: 102, name: t('magel_tyala'), desc: 'Magel Tyala Shettale Scheme', img: 'https://placehold.co/100x100?text=MTS', url: '#' },
        { id: 103, name: t('ambedkar_yojana'), desc: 'Ambedkar Krushi Swavalamban', img: 'https://placehold.co/100x100?text=AK', url: '#' },
        { id: 104, name: t('birsa_munda'), desc: 'Birsa Munda Krishi Kranti Yojana', img: 'https://placehold.co/100x100?text=BM', url: '#' },
        { id: 105, name: t('cm_irrigation'), desc: 'CM Sustainable Agriculture Irrigation', img: 'https://placehold.co/100x100?text=CMSI', url: '#' },
        { id: 106, name: t('shivaji_maharaj'), desc: 'CSM Shetkari Sanman Yojana', img: 'https://placehold.co/100x100?text=CSM', url: '#' },
        { id: 107, name: t('mahadbt'), desc: 'MahaDBT Farmer Subsidies', img: 'https://placehold.co/100x100?text=DBT', url: '#' },
        { id: 108, name: t('munde_vima'), desc: 'Gopinath Munde Shetkari Vima', img: 'https://placehold.co/100x100?text=GMV', url: '#' },
        { id: 109, name: t('sharad_pawar'), desc: 'Sharad Pawar Gram Samridhi', img: 'https://placehold.co/100x100?text=SPG', url: '#' },
        { id: 110, name: t('fundkar_orchard'), desc: 'Bhausaheb Fundkar Horticulture', img: 'https://placehold.co/100x100?text=BF', url: '#' },
        { id: 111, name: t('pocra'), desc: 'Nanaji Deshmukh Krishi Sanjivani', img: 'https://placehold.co/100x100?text=PoCRA', url: '#' },
        { id: 112, name: t('pashudhan'), desc: 'Mukhyamantri Pashudhan Sanvardhan', img: 'https://placehold.co/100x100?text=MPS', url: '#' },
    ];

    const SchemeCard = ({ scheme }) => (
        <a
            href={scheme.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden active:scale-95 transition-transform ${viewMode === 'list' ? 'flex p-3 gap-3' : 'flex flex-col p-3 text-center'}`}
        >
            <img
                src={scheme.img}
                alt={scheme.name}
                className={`${viewMode === 'list' ? 'w-16 h-16 rounded-lg' : 'w-20 h-20 rounded-full mx-auto mb-2'} object-cover bg-gray-50`}
            />
            <div className="flex-1">
                <h3 className="font-bold text-gray-800 text-sm leading-tight">{scheme.name}</h3>
                <p className="text-[10px] text-gray-400 mt-1 line-clamp-1">{scheme.desc}</p>
                {viewMode === 'list' && (
                    <span className="inline-flex items-center gap-1 mt-2 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                        Apply Now <ExternalLink size={10} />
                    </span>
                )}
            </div>
        </a>
    );

    return (
        <MobileLayout t={t}>
            <div className="flex items-center justify-between mb-6 pt-2">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="p-2 bg-white rounded-full shadow-sm border border-gray-100">
                        <ArrowLeft size={20} className="text-gray-600" />
                    </button>
                    <h1 className="text-xl font-black text-gray-800">{t('govt_schemes')}</h1>
                </div>

                <div className="flex bg-gray-200 p-1 rounded-lg">
                    <button onClick={() => setViewMode('list')} className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-white shadow-sm text-green-700' : 'text-gray-500'}`}>
                        <List size={18} />
                    </button>
                    <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm text-green-700' : 'text-gray-500'}`}>
                        <LayoutGrid size={18} />
                    </button>
                </div>
            </div>

            {/* SECTION 1: MAHARASHTRA SCHEMES */}
            <div className="mb-8">
                <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4 px-1 border-l-4 border-orange-500 pl-3">
                    {t('state_schemes')}
                </h2>
                <div className={viewMode === 'list' ? 'space-y-3' : 'grid grid-cols-2 gap-3'}>
                    {maharashtraSchemes.map(s => <SchemeCard key={s.id} scheme={s} />)}
                </div>
            </div>

            {/* SECTION 2: CENTRAL SCHEMES */}
            <div className="mb-8">
                <h2 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4 px-1 border-l-4 border-blue-500 pl-3">
                    {t('central_schemes')}
                </h2>
                <div className={viewMode === 'list' ? 'space-y-3' : 'grid grid-cols-2 gap-3'}>
                    {centralSchemes.map(s => <SchemeCard key={s.id} scheme={s} />)}
                </div>
            </div>
        </MobileLayout>
    );
};

export default Schemes;