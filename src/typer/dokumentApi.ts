export interface IDokumentData {
  vilkår: IVilkår;
  personopplysninger: IPersonopplysninger;
  vedtak: IVedtak;
  søknadsdatoer: ISøknadsdatoer;
}

export interface ISøknadsdatoer {
  søknadsdato: string;
  søkerStønadFra: string;
}

export interface IVedtak {
  resultatType: EBehandlingResultat;
  periodeBegrunnelse: string;
  inntektBegrunnelse: string;
  perioder: IPeriode[];
  inntekter: IInntekt[];
}

export interface IInntekt {
  årMånedFra: string;
  forventetInntekt: number;
  samordningsfradrag?: number;
}
export enum EBehandlingResultat {
  INNVILGE = 'INNVILGE',
  AVSLÅ = 'AVSLÅ',
  HENLEGGE = 'HENLEGGE',
  BEHANDLE_I_GOSYS = 'BEHANDLE_I_GOSYS',
}

export const behandlingResultatTilTekst: Record<EBehandlingResultat, string> = {
  INNVILGE: 'Innvilge',
  AVSLÅ: 'Avslå',
  HENLEGGE: 'Henlegge',
  BEHANDLE_I_GOSYS: 'Behandle i Gosys',
};

export interface IPeriode {
  periodeType: EPeriodetype;
  aktivitet: EAktivitet;
  årMånedFra: string;
  årMånedTil: string;
}
export enum EPeriodetype {
  PERIODE_FØR_FØDSEL = 'PERIODE_FØR_FØDSEL',
  HOVEDPERIODE = 'HOVEDPERIODE',
}

export const periodetypeTilTekst: Record<EPeriodetype, string> = {
  PERIODE_FØR_FØDSEL: 'Periode før fødsel',
  HOVEDPERIODE: 'Hovedperiode',
};

export enum EAktivitet {
  IKKE_AKTIVITETSPLIKT = 'IKKE_AKTIVITETSPLIKT',
  BARN_UNDER_ETT_ÅR = 'BARN_UNDER_ETT_ÅR',
  FORSØRGER_I_ARBEID = 'FORSØRGER_I_ARBEID',
  FORSØRGER_I_UTDANNING = 'FORSØRGER_I_UTDANNING',
  FORSØRGER_REELL_ARBEIDSSØKER = 'FORSØRGER_REELL_ARBEIDSSØKER',
  FORSØRGER_ETABLERER_VIRKSOMHET = 'FORSØRGER_ETABLERER_VIRKSOMHET',
  BARNET_SÆRLIG_TILSYNSKREVENDE = 'BARNET_SÆRLIG_TILSYNSKREVENDE',
  FORSØRGER_MANGLER_TILSYNSORDNING = 'FORSØRGER_MANGLER_TILSYNSORDNING',
  FORSØRGER_ER_SYK = 'FORSØRGER_ER_SYK',
  BARNET_ER_SYKT = 'BARNET_ER_SYKT',
}

export const aktivitetsTypeTilTekst: Record<EAktivitet, string> = {
  IKKE_AKTIVITETSPLIKT: 'Ikke aktivitetsplikt',
  BARN_UNDER_ETT_ÅR: 'Barn er under 1 år',
  FORSØRGER_I_ARBEID: 'Forsørger er i arbeid (§15-6 første ledd)',
  FORSØRGER_I_UTDANNING: 'Forsørger er i utdanning (§15-6 første ledd)',
  FORSØRGER_REELL_ARBEIDSSØKER: ' Forsørger er reell arbeidssøker (§15-6 første ledd)',
  FORSØRGER_ETABLERER_VIRKSOMHET: 'Forsørger etablerer egen virksomhet (§15-6 første ledd)',
  BARNET_SÆRLIG_TILSYNSKREVENDE: 'Barnet er særlig tilsynskrevende (§15-6 fjerde ledd)',
  FORSØRGER_MANGLER_TILSYNSORDNING: 'Forsørger mangler tilsynsordning (§15-6 femte ledd)',
  FORSØRGER_ER_SYK: 'Forsørger er syk (§15-6 femte ledd)',
  BARNET_ER_SYKT: 'Barnet er sykt (§15-6 femte ledd)',
};

export interface IPersonopplysninger {
  navn: string;
  personIdent: string;
}

export interface IVilkår {
  vurderinger: IVurdering[];
  grunnlag: IVilkårGrunnlag;
}

export interface IVilkårGrunnlag {
  medlemskap: IMedlemskap;
  sivilstand: ISivilstandVilkår;
  //bosituasjon: IBosituasjon;
  sivilstandsplaner: ISivilstandsplaner;
  barnMedSamvær: IBarnMedSamvær[];
}

export interface ISivilstandVilkår {
  registergrunnlag: ISivilstandRegistergrunnlag;
}

export interface ISivilstandRegistergrunnlag {
  type: SivilstandType;
  navn?: string;
  gyldigFraOgMed: string;
}

export interface IBarnMedSamvær {
  barnId: string;
  registergrunnlag: IBarnMedSamværRegistergrunnlag;
  søknadsgrunnlag: IBarnMedSamværSøknadsgrunnlag;
}

export interface IBarnMedSamværRegistergrunnlag {
  navn?: string;
  fødselsnummer?: string;
  harSammeAdresse?: boolean;
  forelder?: IAnnenForelder;
}

export interface IBarnMedSamværSøknadsgrunnlag {
  navn?: string;
  fødselsnummer?: string;
  fødselTermindato?: string;
  erBarnetFødt: boolean;
  harSammeAdresse?: boolean;
  forelder?: IAnnenForelder;
}

export interface IAnnenForelder {
  navn?: string;
  fødselsnummer?: string;
  fødselsdato?: string;
  bosattINorge?: boolean;
  land?: string;
}

export interface IMedlemskap {
  registergrunnlag: IMedlemskapRegistergrunnlag;
}

export interface IMedlemskapRegistergrunnlag {
  nåværendeStatsborgerskap: string[];
  oppholdstatus: IOppholdstatus[];
  statsborgerskap: IStatsborgerskap[];
  folkeregisterpersonstatus: Folkeregisterpersonstatus; //TODO: Definere typen et annet sted enn personopplysninger?
  innflytting: IInnflyttingTilNorge[];
  utflytting: IUtflyttingFraNorge[];
  medlUnntak: IGyldigeVedtakPerioderIMedl;
}

export type IGyldigeVedtakPerioderIMedl = { gyldigeVedtaksPerioder: IGyldigVedtakPeriode[] };
export interface IGyldigVedtakPeriode {
  fraogmedDato: string;
  tilogmedDato: string;
  erMedlemIFolketrygden: boolean;
}

export interface IOppholdstatus {
  fraDato?: string;
  tilDato?: string;
  oppholdstillatelse: Oppholdstatus;
}

export type Oppholdstatus = 'MIDLERTIDIG' | 'PERMANENT' | 'UKJENT';

export interface ISivilstandsplaner {
  harPlaner?: boolean;
  fraDato?: string;
  vordendeSamboerEktefelle?: IPersonDetaljer;
}

export interface IVurdering {
  id: string;
  resultat: Vilkårsresultat;
  behandlingId: string;
  barnId?: string;
  vilkårType: VilkårType;
  delvilkårsvurderinger: IDelvilkår[];
  endretAv: string;
  endretTid: string;
}

export interface Vurderingsfeilmelding {
  [Key: string]: string;
}

export enum IRegelId {
  SLUTT_NODE = 'SLUTT_NODE',

  //Tidligere perioder
  HAR_TIDLIGERE_ANDRE_STØNADER_SOM_HAR_BETYDNING = 'HAR_TIDLIGERE_ANDRE_STØNADER_SOM_HAR_BETYDNING',
  HAR_TIDLIGERE_MOTTATT_OVERGANSSTØNAD = 'HAR_TIDLIGERE_MOTTATT_OVERGANSSTØNAD',

  // Medlemskap
  SØKER_MEDLEM_I_FOLKETRYGDEN = 'SØKER_MEDLEM_I_FOLKETRYGDEN',
  MEDLEMSKAP_UNNTAK = 'MEDLEMSKAP_UNNTAK',

  // Opphold
  BOR_OG_OPPHOLDER_SEG_I_NORGE = 'BOR_OG_OPPHOLDER_SEG_I_NORGE',
  OPPHOLD_UNNTAK = 'OPPHOLD_UNNTAK',

  // Samliv
  LEVER_IKKE_MED_ANNEN_FORELDER = 'LEVER_IKKE_MED_ANNEN_FORELDER',
  LEVER_IKKE_I_EKTESKAPLIGNENDE_FORHOLD = 'LEVER_IKKE_I_EKTESKAPLIGNENDE_FORHOLD',

  // Aleneomsorg
  SKRIFTLIG_AVTALE_OM_DELT_BOSTED = 'SKRIFTLIG_AVTALE_OM_DELT_BOSTED',
  NÆRE_BOFORHOLD = 'NÆRE_BOFORHOLD',
  MER_AV_DAGLIG_OMSORG = 'MER_AV_DAGLIG_OMSORG',

  // Mor eller far
  OMSORG_FOR_EGNE_ELLER_ADOPTERTE_BARN = 'OMSORG_FOR_EGNE_ELLER_ADOPTERTE_BARN',

  // Sivilstand
  SAMLIVSBRUDD_LIKESTILT_MED_SEPARASJON = 'SAMLIVSBRUDD_LIKESTILT_MED_SEPARASJON',
  SAMSVAR_DATO_SEPARASJON_OG_FRAFLYTTING = 'SAMSVAR_DATO_SEPARASJON_OG_FRAFLYTTING',
  KRAV_SIVILSTAND_PÅKREVD_BEGRUNNELSE = 'KRAV_SIVILSTAND_PÅKREVD_BEGRUNNELSE',
  KRAV_SIVILSTAND_UTEN_PÅKREVD_BEGRUNNELSE = 'KRAV_SIVILSTAND_UTEN_PÅKREVD_BEGRUNNELSE',
  SIVILSTAND_UNNTAK = 'SIVILSTAND_UNNTAK',

  // Nytt barn samme partner
  HAR_FÅTT_ELLER_VENTER_NYTT_BARN_MED_SAMME_PARTNER = 'HAR_FÅTT_ELLER_VENTER_NYTT_BARN_MED_SAMME_PARTNER',

  // Aktivitet
  FYLLER_BRUKER_AKTIVITETSPLIKT = 'FYLLER_BRUKER_AKTIVITETSPLIKT',

  // Sagt opp arbeidsforhold
  SAGT_OPP_ELLER_REDUSERT = 'SAGT_OPP_ELLER_REDUSERT',
  RIMELIG_GRUNN_SAGT_OPP = 'RIMELIG_GRUNN_SAGT_OPP',
}
export enum ISvarId {
  // Felles
  JA = 'JA',
  NEI = 'NEI',

  // Aleneomsorg
  SAMME_HUS_OG_FÆRRE_ENN_4_BOENHETER = 'SAMME_HUS_OG_FÆRRE_ENN_4_BOENHETER',
  SAMME_HUS_OG_FLERE_ENN_4_BOENHETER_MEN_VURDERT_NÆRT = 'SAMME_HUS_OG_FLERE_ENN_4_BOENHETER_MEN_VURDERT_NÆRT',
  SELVSTENDIGE_BOLIGER_SAMME_GÅRDSTUN = 'SELVSTENDIGE_BOLIGER_SAMME_GÅRDSTUN',
  SELVSTENDIGE_BOLIGER_SAMME_TOMT = 'SELVSTENDIGE_BOLIGER_SAMME_TOMT',
  NÆRMESTE_BOLIG_ELLER_REKKEHUS_I_SAMMEGATE = 'NÆRMESTE_BOLIG_ELLER_REKKEHUS_I_SAMMEGATE',
  TILSTØTENDE_BOLIGER_ELLER_REKKEHUS_I_SAMMEGATE = 'TILSTØTENDE_BOLIGER_ELLER_REKKEHUS_I_SAMMEGATE',

  // Forutgående medlemskap
  MEDLEM_MER_ENN_5_ÅR_AVBRUDD_MINDRE_ENN_10_ÅR = 'MEDLEM_MER_ENN_5_ÅR_AVBRUDD_MINDRE_ENN_10_ÅR',
  MEDLEM_MER_ENN_7_ÅR_AVBRUDD_MER_ENN_10ÅR = 'MEDLEM_MER_ENN_7_ÅR_AVBRUDD_MER_ENN_10ÅR',
  I_LANDET_FOR_GJENFORENING_ELLER_GIFTE_SEG = 'I_LANDET_FOR_GJENFORENING_ELLER_GIFTE_SEG',
  ANDRE_FORELDER_MEDLEM_SISTE_5_ÅR = 'ANDRE_FORELDER_MEDLEM_SISTE_5_ÅR',
  ANDRE_FORELDER_MEDLEM_MINST_5_ÅR_AVBRUDD_MINDRE_ENN_10_ÅR = 'ANDRE_FORELDER_MEDLEM_MINST_5_ÅR_AVBRUDD_MINDRE_ENN_10_ÅR',
  ANDRE_FORELDER_MEDLEM_MINST_7_ÅR_AVBRUDD_MER_ENN_10_ÅR = 'ANDRE_FORELDER_MEDLEM_MINST_7_ÅR_AVBRUDD_MER_ENN_10_ÅR',
  TOTALVURDERING_OPPFYLLER_FORSKRIFT = 'TOTALVURDERING_OPPFYLLER_FORSKRIFT',

  // Opphold
  ARBEID_NORSK_ARBEIDSGIVER = 'ARBEID_NORSK_ARBEIDSGIVER',
  UTENLANDSOPPHOLD_MINDRE_ENN_6_UKER = 'UTENLANDSOPPHOLD_MINDRE_ENN_6_UKER',

  // Sivilstand
  GJENLEVENDE_IKKE_RETT_TIL_YTELSER = 'GJENLEVENDE_IKKE_RETT_TIL_YTELSER',
  GJENLEVENDE_OVERTAR_OMSORG = 'GJENLEVENDE_OVERTAR_OMSORG',
}
export interface IVurderingDelvilkår {
  regelId: IRegelId;
  svar?: ISvarId;
  begrunnelse?: string;
}

export interface IDelvilkår {
  resultat: Vilkårsresultat;
  vurderinger: IVurderingDelvilkår[];
}

export enum SivilstandType {
  UOPPGITT = 'UOPPGITT',
  UGIFT = 'UGIFT',
  GIFT = 'GIFT',
  ENKE_ELLER_ENKEMANN = 'ENKE_ELLER_ENKEMANN',
  SKILT = 'SKILT',
  SEPARERT = 'SEPARERT',
  REGISTRERT_PARTNER = 'REGISTRERT_PARTNER',
  SEPARERT_PARTNER = 'SEPARERT_PARTNER',
  SKILT_PARTNER = 'SKILT_PARTNER',
  GJENLEVENDE_PARTNER = 'GJENLEVENDE_PARTNER',
}

export enum Vilkårsresultat {
  OPPFYLT = 'OPPFYLT',
  IKKE_OPPFYLT = 'IKKE_OPPFYLT',
  IKKE_AKTUELL = 'IKKE_AKTUELL',
  IKKE_TATT_STILLING_TIL = 'IKKE_TATT_STILLING_TIL',
  SKAL_IKKE_VURDERES = 'SKAL_IKKE_VURDERES',
}

export enum Vilkår {
  TIDLIGERE_VEDTAKSPERIODER = 'TIDLIGERE_VEDTAKSPERIODER',
  FORUTGÅENDE_MEDLEMSKAP = 'FORUTGÅENDE_MEDLEMSKAP',
  LOVLIG_OPPHOLD = 'LOVLIG_OPPHOLD',
  SIVILSTAND = 'SIVILSTAND',
  SAMLIV = 'SAMLIV',
  ALENEOMSORG = 'ALENEOMSORG',
  MOR_ELLER_FAR = 'MOR_ELLER_FAR',
  NYTT_BARN_SAMME_PARTNER = 'NYTT_BARN_SAMME_PARTNER',
  SAGT_OPP_ELLER_REDUSERT = 'SAGT_OPP_ELLER_REDUSERT',
  AKTIVITET = 'AKTIVITET',
}

export interface IStatsborgerskap {
  land: string;
  gyldigFraOgMedDato?: string;
  gyldigTilOgMedDato?: string;
}

export enum Folkeregisterpersonstatus {
  BOSATT = 'BOSATT',
  UTFLYTTET = 'UTFLYTTET',
  FORSVUNNET = 'FORSVUNNET',
  DOED = 'DOED',
  OPPHOERT = 'OPPHOERT',
  FOEDSELSREGISTRERT = 'FOEDSELSREGISTRERT',
  MIDLERTIDIG = 'MIDLERTIDIG',
  INAKTIV = 'INAKTIV',
  UKJENT = 'UKJENT',
}

export interface IInnflyttingTilNorge {
  fraflyttingsland?: string;
  fraflyttingssted?: string;
  dato?: string;
}

export interface IUtflyttingFraNorge {
  tilflyttingsland?: string;
  tilflyttingssted?: string;
  dato?: string;
}

export interface IPersonDetaljer {
  navn: string;
  fødselsdato?: string;
  ident?: string;
}

export type VilkårType =
  | Vilkår.FORUTGÅENDE_MEDLEMSKAP
  | Vilkår.LOVLIG_OPPHOLD
  | Vilkår.SIVILSTAND
  | Vilkår.SAMLIV
  | Vilkår.ALENEOMSORG
  | Vilkår.NYTT_BARN_SAMME_PARTNER
  | Vilkår.MOR_ELLER_FAR
  | Vilkår.SAGT_OPP_ELLER_REDUSERT
  | Vilkår.TIDLIGERE_VEDTAKSPERIODER
  | Vilkår.AKTIVITET;

export const vilkårTypeTilTekst: Record<VilkårType, string> = {
  FORUTGÅENDE_MEDLEMSKAP: 'Vilkår om forutgående medlemskap',
  LOVLIG_OPPHOLD: 'Vilkår om opphold i Norge',
  SIVILSTAND: 'Vilkår om sivilstand',
  SAMLIV: 'Vilkår om samliv',
  ALENEOMSORG: 'Vilkår om aleneomsorg',
  MOR_ELLER_FAR: 'Vilkår om mor eller far',
  NYTT_BARN_SAMME_PARTNER: 'Vilkår om nytt barn med samme partner',
  SAGT_OPP_ELLER_REDUSERT: 'Vilkår om sagt opp eller redusert stilling',
  AKTIVITET: 'Aktivitet',
  TIDLIGERE_VEDTAKSPERIODER: 'Tidligere vedtaksperioder',
};
// ------ VILKÅRGRUPPE
/**
 * Gjør det mulig å splitte opp vurderinger i eks Medlemskap, Aleneomsorg, etc.
 * Når man eks legger til en vurdering til medlemskap i VurderingConfig nå så kommer den opp automatisk
 */
export enum VilkårGruppe {
  TIDLIGERE_VEDTAKSPERIODER = 'TIDLIGERE_VEDTAKSPERIODER',
  MEDLEMSKAP = 'MEDLEMSKAP',
  LOVLIG_OPPHOLD = 'LOVLIG_OPPHOLD',
  SIVILSTAND = 'SIVILSTAND',
  SAMLIV = 'SAMLIV',
  ALENEOMSORG = 'ALENEOMSORG',
  MOR_ELLER_FAR = 'MOR_ELLER_FAR',
  NYTT_BARN_SAMME_PARTNER = 'NYTT_BARN_SAMME_PARTNER',
  SAGT_OPP_ELLER_REDUSERT = 'SAGT_OPP_ELLER_REDUSERT',
  AKTIVITET = 'AKTIVITET',
}

export const resultatTilTekst: Record<Vilkårsresultat, string> = {
  OPPFYLT: 'Oppfylt',
  IKKE_AKTUELL: 'Ikke aktuell',
  IKKE_OPPFYLT: 'Ikke oppfylt',
  IKKE_TATT_STILLING_TIL: 'Ikke tatt stilling til',
  SKAL_IKKE_VURDERES: 'Ikke vurdert',
};

export const svarIdTilTekst: Record<ISvarId, string> = {
  JA: 'Ja',
  NEI: 'Nei',
  ARBEID_NORSK_ARBEIDSGIVER: 'Arbeid for norsk arbeidsgiver',
  UTENLANDSOPPHOLD_MINDRE_ENN_6_UKER: 'Utenlandsopphold på mindre enn 6 uker',
  GJENLEVENDE_OVERTAR_OMSORG:
    'Ja, gjenlevende som etter dødsfallet overtar omsorgen for egne særkullsbarn',
  GJENLEVENDE_IKKE_RETT_TIL_YTELSER:
    'Ja, gjenlevende som etter dødsfallet får barn som avdøde ikke er mor/far til, og som ikke har rett til ytelser etter kap.17',
  ANDRE_FORELDER_MEDLEM_MINST_5_ÅR_AVBRUDD_MINDRE_ENN_10_ÅR:
    'Ja, medlem og bosatt når stønadstilfellet oppstod, den andre forelderen har vært medlem i minst fem år etter fylte 16 år når krav fremsettes, og avbruddet er mindre enn 10 år',
  ANDRE_FORELDER_MEDLEM_MINST_7_ÅR_AVBRUDD_MER_ENN_10_ÅR:
    'Ja, medlem og bosatt når stønadstilfellet oppstod, den andre forelderen har vært medlem i minst syv år etter fylte 16 år når krav fremsettes, og avbruddet er mer enn 10 år',
  ANDRE_FORELDER_MEDLEM_SISTE_5_ÅR:
    'Ja, medlem og bosatt når stønadstilfellet oppstod, den andre forelderen er bosatt og har vært medlem siste fem år',
  I_LANDET_FOR_GJENFORENING_ELLER_GIFTE_SEG:
    'Ja, medlem og bosatt når stønadstilfellet oppstod, kom til landet for gjenforening med ektefelle/samboer med felles barn, eller for å gifte seg med en som er bosatt, og hadde gyldig oppholdstillatelse ved ankomst',
  MEDLEM_MER_ENN_5_ÅR_AVBRUDD_MINDRE_ENN_10_ÅR:
    'Ja, medlem i minst 5 år etter fylte 16 år når krav fremsettes, og avbruddet er mindre enn 10 år',
  MEDLEM_MER_ENN_7_ÅR_AVBRUDD_MER_ENN_10ÅR:
    'Ja, medlem i minst syv år etter fylte 16 år når krav fremsettes, og avbruddet er mer enn 10 år',
  TOTALVURDERING_OPPFYLLER_FORSKRIFT:
    'Ja, totalvurdering viser at forholdene går inn under forskriften om kravet om fem års forutgående medlemskap',
  SAMME_HUS_OG_FÆRRE_ENN_4_BOENHETER:
    'Ja, søker bor i samme hus som den andre forelderen og huset har 4 eller færre boenheter',
  SAMME_HUS_OG_FLERE_ENN_4_BOENHETER_MEN_VURDERT_NÆRT:
    'Ja, søker bor i samme hus som den andre forelderen og huset har flere enn 4 boenheter, men boforholdet er vurdert nært',
  SELVSTENDIGE_BOLIGER_SAMME_TOMT:
    'Ja, foreldrene bor i selvstendige boliger på samme tomt eller gårdsbruk',
  SELVSTENDIGE_BOLIGER_SAMME_GÅRDSTUN:
    'Ja, foreldrene bor i selvstendige boliger på samme gårdstun',
  NÆRMESTE_BOLIG_ELLER_REKKEHUS_I_SAMMEGATE:
    'Ja, foreldrene bor i nærmeste bolig eller rekkehus i samme gate',
  TILSTØTENDE_BOLIGER_ELLER_REKKEHUS_I_SAMMEGATE:
    'Ja, foreldrene bor i tilstøtende boliger eller rekkehus i samme gate',
};
export const delvilkårTypeTilTekst: Record<IRegelId, string> = {
  SØKER_MEDLEM_I_FOLKETRYGDEN: 'Har bruker vært medlem i folketrygden i de siste 5 årene?',
  BOR_OG_OPPHOLDER_SEG_I_NORGE: 'Bor og oppholder bruker og barna seg i Norge?',
  KRAV_SIVILSTAND_PÅKREVD_BEGRUNNELSE: 'Er krav til sivilstand oppfylt?',
  KRAV_SIVILSTAND_UTEN_PÅKREVD_BEGRUNNELSE: 'Er krav til sivilstand oppfylt?',
  SAMLIVSBRUDD_LIKESTILT_MED_SEPARASJON: 'Kan samlivsbrudd likestilles med formell separasjon?',
  SAMSVAR_DATO_SEPARASJON_OG_FRAFLYTTING:
    'Er det samsvar mellom datoene for separasjon og fraflytting?',
  LEVER_IKKE_MED_ANNEN_FORELDER:
    'Er vilkåret om å ikke leve sammen med den andre av barnets/barnas foreldre oppfylt?',
  LEVER_IKKE_I_EKTESKAPLIGNENDE_FORHOLD:
    'Er vilkåret om å ikke leve i et ekteskapslignende forhold i felles husholdning uten felles barn oppfylt?',
  SKRIFTLIG_AVTALE_OM_DELT_BOSTED: 'Har foreldrene inngått skriftlig avtale om delt bosted?',
  NÆRE_BOFORHOLD: 'Har bruker og den andre forelderen nære boforhold?',
  MER_AV_DAGLIG_OMSORG: 'Har bruker klart mer av den daglige omsorgen?',
  OMSORG_FOR_EGNE_ELLER_ADOPTERTE_BARN: 'Har bruker omsorgen for egne/adopterte barn? ',
  HAR_FÅTT_ELLER_VENTER_NYTT_BARN_MED_SAMME_PARTNER:
    'Har søker fått nytt barn med samme partner (født etter 01.01.2016) eller venter nytt barn med samme partner, etter at en av foreldrene tidligere har mottatt eller fortsatt mottar stønad for et annet felles barn?',
  SAGT_OPP_ELLER_REDUSERT:
    'Har søker sagt opp jobben, tatt frivillig permisjon eller redusert arbeidstiden de siste 6 månedene før søknadstidspunktet?',
  MEDLEMSKAP_UNNTAK: 'Er unntak fra hovedregelen oppfylt?',
  OPPHOLD_UNNTAK: 'Er unntak fra hovedregelen oppfylt?',
  FYLLER_BRUKER_AKTIVITETSPLIKT:
    'Fyller bruker aktivitetsplikt, unntak for aktivitetsplikt eller har barn under 1 år?',
  SIVILSTAND_UNNTAK: 'Er unntak fra krav om sivilstand oppfylt?',
  RIMELIG_GRUNN_SAGT_OPP:
    'Hadde søker rimelig grunn til å si opp jobben eller redusere arbeidstiden?',
  SLUTT_NODE: 'UGYLDIG DELVILKÅR',
  HAR_TIDLIGERE_ANDRE_STØNADER_SOM_HAR_BETYDNING:
    'Har søker tidligere mottatt andre stønader som har betydning for stønadstiden i §15-8 første og andre ledd?',
  HAR_TIDLIGERE_MOTTATT_OVERGANSSTØNAD: 'Har søker tidligere mottatt overgangsstønad?',
};

export const sivilstandTilTekst: Record<SivilstandType, string> = {
  UOPPGITT: 'Ikke oppgitt',
  UGIFT: 'Ugift',
  GIFT: 'Gift',
  ENKE_ELLER_ENKEMANN: 'Enke/Enkemann',
  SKILT: 'Skilt',
  SKILT_PARTNER: 'Skilt partner',
  SEPARERT: 'Separert',
  SEPARERT_PARTNER: 'Separert partner',
  REGISTRERT_PARTNER: 'Registrert partner',
  GJENLEVENDE_PARTNER: 'Gjenlevende partner',
};
