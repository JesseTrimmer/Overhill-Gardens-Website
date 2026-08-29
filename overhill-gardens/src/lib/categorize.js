const TREE = new Set(`Acer Aesculus Alnus Amelanchier Betula Carpinus Carya Castanea Catalpa
Celtis Cercis Chamaecyparis Chionanthus Cladrastis Cotinus Crataegus Diospyros
Fagus Fraxinus Gleditsia Gordonia Gymnocladus Halesia Juglans Juniperus Leitneria
Liquidambar Liriodendron Maclura Magnolia Nyssa Oxydendrum Persea Pinus Platanus
Populus Ptelea Quercus Robinia Sideroxylon Taxodium Thuja Tilia Ulmus Zanthoxylum
Rhapidophyllum`.split(/\s+/))

const SHRUB = new Set(`Agarista Amorpha Aronia Baccharis Callicarpa Calycanthus Cephalanthus
Chamaedaphne Clethra Conradina Corylus Croton Cyrilla Diervilla Dirca Euonymus
Eubotrys Fothergilla Frangula Hamamelis Hydrangea Hypericum Ilex Illicium Itea
Kalmia Lindera Lyonia Morella Neviusia Philadelphus Physocarpus Rhododendron
Rhus Ribes Rosa Spiraea Styrax Symphoricarpos Vaccinium Viburnum Zenobia`.split(/\s+/))

const FERN = new Set(`Adiantum Athyrium Dryopteris Matteuccia Onoclea Osmunda Polystichum
Thelypteris`.split(/\s+/))

const GRASS = new Set(`Andropogon Boutelouoa Chasmanthium Danthonia Deschampsia Diarrhena
Dichanthelium Elymus Eragrostis Erianthus Muhlenbergia Nassella Panicum
Piptochaetium Pityopsis Saccharum Schizachyrium Sorghastrum Sporobolus Tridens
Tripsacum`.split(/\s+/))

const SEDGE = new Set(`Carex Rhynchospora Scirpus Juncus`.split(/\s+/))

const VINE = new Set(`Ampelopsis Aristolochia Berchemia Bignonia Campsis Clematis Decumaria
Gelsemium Lonicera Vitis Wisteria Apios Ampelaster`.split(/\s+/))

const CATEGORY_MAP = {}
for (const g of TREE) CATEGORY_MAP[g] = 'Tree'
for (const g of SHRUB) CATEGORY_MAP[g] = 'Shrub'
for (const g of FERN) CATEGORY_MAP[g] = 'Fern'
for (const g of GRASS) CATEGORY_MAP[g] = 'Grass'
for (const g of SEDGE) CATEGORY_MAP[g] = 'Sedge'
for (const g of VINE) CATEGORY_MAP[g] = 'Vine'

export function categorize(latin, common) {
  const genus = (latin || '').trim().split(' ')[0]
  if (CATEGORY_MAP[genus]) return CATEGORY_MAP[genus]

  const c = (common || '').toLowerCase()
  if (c.includes('fern')) return 'Fern'
  if (c.includes('sedge')) return 'Sedge'
  if (c.includes('rush')) return 'Sedge'
  if (c.includes('grass') || c.includes('bluestem') || c.includes('muhly')) return 'Grass'
  if (['oak','maple','pine','cedar','birch','hickory','cypress','sycamore','poplar','elm',
       'walnut','beech','magnolia','cottonwood','locust','buckeye','persimmon','coffeetree',
       'hackberry','tupelo','gum','sourwood','redbud','yellowwood','catalpa','holly']
      .some(w => c.includes(w))) return 'Tree'
  if (['viburnum','azalea','blueberry','dogwood','sweetspire','hydrangea','summersweet',
       'fothergilla','sumac','rose ','spirea','honeysuckle','bush','shrub','witch hazel',
       'chokeberry','sweetshrub','leucothoe','doghobble','myrtle']
      .some(w => c.includes(w))) return 'Shrub'
  if (['vine','wisteria','crossvine','jessamine','clematis','muscadine','groundnut']
      .some(w => c.includes(w))) return 'Vine'
  return 'Perennial'
}