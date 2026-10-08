import starWreath from '../../../../assets/explore-creds/star-wreath.png';
import laurelWreathOne from '../../../../assets/explore-creds/laurel-wreath-1.png';
import laurelWreathTwo from '../../../../assets/explore-creds/laurel-wreath-2.png';

const wreaths = [starWreath, laurelWreathOne, laurelWreathTwo];
const issuerMarks = [
 [/hyperiondev.*stellenbosch/i, 'HD / SU'], [/stellenbosch/i, 'SU'],
 [/university of south africa/i, 'UNISA'], [/microsoft/i, 'MS'], [/aws.*udacity/i, 'AWS / U'],
 [/amazon web services|aws/i, 'AWS'], [/wethinkcode/i, 'WTC'],
 [/google/i, 'GC'], [/n8n/i, 'n8n'], [/linux foundation/i, 'LF'],
 [/ibm/i, 'IBM'], [/anthropic/i, 'ANT'], [/oracle/i, 'ORA'],
];
export default function CredentialSeal({ issuer = '', date = '', wreathVariant = 0 }) {
 const monogram = issuerMarks.find(([pattern]) => pattern.test(issuer))?.[1]
  || issuer.split(/\s+/).filter(Boolean).map(word => word[0]).slice(0, 4).join('').toUpperCase();
 const year = date.match(/\b(?:19|20)\d{2}\b/g)?.join('–') || date;
 return <svg className="credential-seal" viewBox="0 0 240 240" aria-hidden="true" focusable="false">
  <circle className="credential-seal-ring" cx="120" cy="120" r="108" />
  <circle className="credential-seal-ring credential-seal-inner" cx="120" cy="120" r="99" />
  <circle className="credential-seal-ring credential-seal-center" cx="120" cy="120" r="72" />
  <image className="credential-seal-wreath" href={wreaths[wreathVariant % wreaths.length]} x="20" y="20" width="200" height="200" preserveAspectRatio="xMidYMid meet" />
  <text className={`credential-seal-mark ${monogram.length > 5 ? 'credential-seal-mark-long' : ''}`} x="120" y="123" textAnchor="middle">{monogram}</text>
  <text className="credential-seal-year" x="120" y="151" textAnchor="middle">{year}</text>
 </svg>;
}
