const trails = [
    ['太平村｜仙人堀杉林步道', 'Cedar Wooden Prank.kml'],
    ['太平村｜大巃頂步道', 'dalonding_trail.kml'],
    ['太平村｜梨仔腳山', 'Lizijao_trail.kml'],
    ['太平村｜太平雲梯環狀路線', 'Taipingbridge.kml'],
    ['太平村｜孝子路步道', 'Xiaozilu_trail.kml'],
    ['太平村｜雲之南茶園步道', 'Yunzhinan_trail.kml'],
    ['瑞里村｜野薑花溪步道', 'Ginger-FlowerTrail.kml'],
    ['瑞里村｜綠色隧道', 'GreenTunnel.kml'],
    ['瑞里村｜瑞太古道', 'Ruili-Taihe.kml'],
    ['瑞里村｜青年嶺步道', 'YouthRidge.kml'],
    ['瑞峰村｜竹坑溪步道', 'ZhukengStream.kml'],
    ['太和村｜巃仔尾／花石溪步道', 'Longziwei.kml'],
    ['太興村｜太興岩步道', 'Taxingyan.kml'],
    ['太興村｜飛瀑步道', 'Waterfall_trail.kml'],
    ['仁壽村｜圓潭生態園區', 'Yuan_Tan.kml'],
    ['仁壽村｜雲潭步道', 'Yuntan_trail.kml'],
    ['龍眼村｜大尖二尖山步道', 'dajian_trail.kml'],
    ['獨立山步道', 'dulishan_trail.kml'],
    ['雲嘉六連峰', 'six_peak.kml']
];

const trailPicker = document.getElementById('trail-picker');
const trailSearch = document.getElementById('trail-search');
const trailList = document.getElementById('trail-list');
const noTrails = document.getElementById('trail-empty');

function renderTrails() {
    const query = trailSearch.value.trim().normalize('NFKC').toLowerCase();
    const rows = trails.filter(([label, file]) =>
        (label + ' ' + file).normalize('NFKC').toLowerCase().includes(query)
    ).map(([label, file]) => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        const params = new URLSearchParams({ route: './route/' + encodeURIComponent(file), view: '1' });
        link.href = '?' + params;
        link.textContent = label;
        const arrow = document.createElement('span');
        arrow.textContent = '›';
        arrow.setAttribute('aria-hidden', 'true');
        link.append(arrow);
        li.append(link);
        return li;
    });
    trailList.replaceChildren(...rows);
    noTrails.hidden = rows.length > 0;
}

function openTrails() {
    trailSearch.value = '';
    renderTrails();
    if (!trailPicker.open) trailPicker.showModal();
    trailPicker.querySelector('button').focus();
}

trailSearch.addEventListener('input', renderTrails);
document.getElementById('open-trails').addEventListener('click', openTrails);
if (isViewOnly && !urlParams.has('route') && !urlParams.has('s')) openTrails();
