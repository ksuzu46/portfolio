/**
 * processMarkdown.mjs
 * @author [Keisuke Suzuki](https://github.com/Ks5810)
 */

import axios from "axios";
import { print } from "graphql"
import { gfmUrl } from "./config";


const splitJekyllHeader = (text, index) => {
    /**
     * Get first string that starts from a string `---\n`, and ends with
     *  `---`
     */
    const headerRe = /[-]{3,}\n[^[-]{3,}]*[-]{3,}/g;
    const subtitleRe = /(?=subtitle:).*$/mg;
    const headerRes = headerRe.exec(text) || [];
    const header = headerRes[0] ? headerRes[0] : "";
    const subtitleRes =  subtitleRe.exec(header) || [];
    const subtitle =  subtitleRes[0] ? subtitleRes[0].replace("subtitle:" +
                                                              " " , '') : '';
    const tmptext = text.substr(headerRe.lastIndex);
    const body = tmptext.replace(/^\n/, '');
    
    return { subtitle, body };
}

const renderGfm = async (text) =>
    {
        const { subtitle, body } = splitJekyllHeader(text)
        try
        {
            const res = await axios.post(gfmUrl, { text: body, mode: 'markdown'},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        "Access-Control-Allow-Origin": "*",
                        'Authorization': `Bearer ${ process.env.GH_TOKEN }`
                    }
                }
            );
            const { data } = res;
            return { subtitle, body: data }
        } catch(error)
        {
            console.log(error);
            return error;
        }
    }
    
export { renderGfm };