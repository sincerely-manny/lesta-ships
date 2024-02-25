import { type StaticImageData } from 'next/image';
import commonwealth from 'public/image/nations/commonwealth.png';
import europe from 'public/image/nations/europe.png';
import france from 'public/image/nations/france.png';
import germany from 'public/image/nations/germany.png';
import italy from 'public/image/nations/italy.png';
import japan from 'public/image/nations/japan.png';
import netherlands from 'public/image/nations/netherlands.png';
import pan_america from 'public/image/nations/pan_america.png';
import pan_asia from 'public/image/nations/pan_asia.png';
import spain from 'public/image/nations/spain.png';
import uk from 'public/image/nations/uk.png';
import usa from 'public/image/nations/usa.png';
import ussr from 'public/image/nations/ussr.png';

const flags: Record<string, StaticImageData> = {
    commonwealth,
    europe,
    france,
    germany,
    italy,
    japan,
    netherlands,
    pan_america,
    pan_asia,
    spain,
    uk,
    usa,
    ussr,
};

export default flags;
