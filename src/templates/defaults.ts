import { nanoid } from 'nanoid';
import type { Slide, SlideType } from '../types';

export const SLIDE_TYPE_LABELS: Record<SlideType, string> = {
  title: 'Title',
  content: 'Content (h2 + body)',
  'two-col': 'Two columns',
  'card-grid': 'Card grid',
  process: 'Process steps',
  stats: 'Stats / numbers',
  'accent-bar': 'Accent bar body',
  'divider-light': 'Section divider (light)',
  'divider-dark': 'Section divider (dark)',
  'image-bleed': 'Image (full bleed)',
  table: 'Table',
  'dark-image-text': 'Dark text on image',
  contact: 'Contact',
};

export const SLIDE_TYPES = Object.keys(SLIDE_TYPE_LABELS) as SlideType[];

export function makeSlide(type: SlideType): Slide {
  const base = { id: nanoid(8), type, images: [], showChrome: true };
  switch (type) {
    case 'title':
      return {
        ...base,
        fields: {
          h1: 'Orchestra',
          subtitle: 'Introductie Charity Office',
          footer: 'governance • beheer • administratie',
          logoHeight: 140,
          logoMaxWidth: 70,
        },
      };
    case 'content':
      return {
        ...base,
        fields: {
          h2: 'Onze missie',
          subtitle: 'Achtergrond en visie',
          body:
            'Orchestra biedt integrale dienstverlening voor vermogensfondsen en families. Wij combineren vermogensbeheer, administratie en governance.',
          bullets: [],
        },
      };
    case 'two-col':
      return {
        ...base,
        fields: {
          h2: 'Onze aanpak',
          subtitle: 'Specialisme & ervaring',
          leftTitle: 'Onze missie',
          leftBody: 'Wij maken het besturen van vermogensfondsen efficiënter.',
          rightTitle: 'Achtergrond',
          rightBody: 'Sinds 2012 leveren wij integrale dienstverlening, onder toezicht van DNB en AFM.',
        },
      };
    case 'card-grid':
      return {
        ...base,
        fields: {
          h2: 'Dienstverlening',
          subtitle: 'Een samenspel van',
          cols: 3,
          cards: [
            { title: 'Governance', body: 'Regisseren en coördineren tot een uitgebalanceerd geheel.' },
            { title: 'Vermogensbeheer', body: 'Stabiel rendement tegen voorspelbare kosten.' },
            { title: 'Administratie', body: 'Inzicht in een gedegen en complete administratie.' },
          ],
        },
      };
    case 'process':
      return {
        ...base,
        fields: {
          h2: 'Beleggingsproces',
          subtitle: 'Vier stappen voor zorgvuldig beheer',
          steps: [
            { title: 'Planning', body: 'Doelen, restricties en Investment Policy Statement.' },
            { title: 'Onderzoek & Analyse', body: 'Marktanalyse en asset allocatie.' },
            { title: 'Implementatie', body: 'Portfolio constructie en executie.' },
            { title: 'Evaluatie', body: 'Monitoring en rapportage.' },
          ],
        },
      };
    case 'stats':
      return {
        ...base,
        fields: {
          h2: 'In cijfers',
          subtitle: 'Onze organisatie',
          stats: [
            { number: '€1,5 Mld', label: 'Vermogen onder regie' },
            { number: '100+', label: 'Tevreden klanten' },
            { number: '25+', label: 'Specialisten' },
          ],
        },
      };
    case 'accent-bar':
      return {
        ...base,
        variant: 'gold',
        fields: {
          h2: 'Goed samenspel\nzorgt voor rust',
          subtitle: '',
          body:
            'Bij Orchestra zien we financieel beheer als een samenspel van governance, vermogensbeheer, administratie en projectadministratie.',
        },
      };
    case 'divider-light':
      return {
        ...base,
        fields: {
          label: 'Onze visie',
          h2: 'Verantwoord financieel beheer\nbegint met een vast tarief',
        },
      };
    case 'divider-dark':
      return {
        ...base,
        fields: {
          h2: 'Onze visie op beheer en beleggen',
          bigStatement: 'Uw vermogen verdient beter!',
        },
      };
    case 'image-bleed':
      return {
        ...base,
        fields: {
          h2: 'Impact kostenstructuur',
          subtitle: 'Vermogensontwikkeling',
          imageDataUrl: '',
          imageScale: 1,
          imageObjectFit: 'contain',
          imageOffsetX: 0,
          imageOffsetY: 0,
        },
      };
    case 'table':
      return {
        ...base,
        fields: {
          h2: 'Afdeling & teams',
          subtitle: '',
          headers: ['Afdeling', 'Teamleden'],
          rows: [
            ['Investment Team', 'A. Bisoen · J. Berkhemer · R. Bolle'],
            ['Wealth Management', 'G. Drijver · R. Bolle'],
            ['Risk & Compliance', 'P. Verweij · W. Hofhuis'],
            ['Back Office', 'C. Groen · C. Poorter'],
          ],
        },
      };
    case 'dark-image-text':
      return {
        ...base,
        fields: {
          h2: 'Uw Private Office',
          body:
            'Wie vermogen bezit of beheert, wil daar goed en verantwoord mee omgaan. Wij combineren kennis van zaken met onbegrensde service.',
          bgImageDataUrl: '',
          bgSize: 'cover',
          bgScale: 1,
          bgPositionX: 50,
          bgPositionY: 50,
        },
      };
    case 'contact':
      return {
        ...base,
        fields: {
          logoText: 'ORCHESTRA',
          address: ['Mauritskade 25', '2514 HD Den Haag'],
          phone: '+31 (0)70 205 11 80',
          website: 'orchestra-family.com',
          websiteUrl: 'https://orchestra-family.com/',
          logoHeight: 200,
          logoMaxWidth: 380,
        },
      };
    default:
      return { ...base, fields: {} };
  }
}
