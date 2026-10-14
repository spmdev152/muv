/**
 * Las ocho páginas de servicio por sede (#29): cuatro por clínica, las que MUV
 * eligió desarrollar en página propia.
 *
 * El orden de cada lista es el de sus documentos (issues #39–#46) y es el que
 * sigue el menú.
 */

import type { SedeServiceContent } from "@/content/sede-service-types";
import { tresCantosDeportiva } from "@/content/sede-services/tres-cantos-fisioterapia-deportiva";
import { tresCantosRodilla } from "@/content/sede-services/tres-cantos-fisioterapia-rodilla";
import { tresCantosEspalda } from "@/content/sede-services/tres-cantos-fisioterapia-espalda";
import { tresCantosFuncional } from "@/content/sede-services/tres-cantos-entrenamiento-funcional";
import { elCanaveralInvasivaEcografia } from "@/content/sede-services/el-canaveral-fisioterapia-invasiva-ecografia";
import { elCanaveralSueloPelvico } from "@/content/sede-services/el-canaveral-suelo-pelvico";
import { elCanaveralPilates } from "@/content/sede-services/el-canaveral-pilates";
import { elCanaveralFuncional } from "@/content/sede-services/el-canaveral-entrenamiento-funcional";

export const sedeServices: Record<string, SedeServiceContent[]> = {
  "el-canaveral": [
    elCanaveralInvasivaEcografia,
    elCanaveralSueloPelvico,
    elCanaveralPilates,
    elCanaveralFuncional,
  ],
  "tres-cantos": [
    tresCantosDeportiva,
    tresCantosRodilla,
    tresCantosEspalda,
    tresCantosFuncional,
  ],
};

export function getSedeService(
  location: string,
  slug: string,
): SedeServiceContent | undefined {
  return sedeServices[location]?.find((s) => s.slug === slug);
}

export function sedeServicePath(service: SedeServiceContent): string {
  return `/sedes/${service.location}/${service.slug}`;
}
