import { Jimp } from "jimp";

/**
 * Reads two images from file paths using the pixel match library which can be memory intensive,
 * images must have the same dimensions.
 * @param pathOne absolute file path
 * @param pathTwo absolute file path
 * @returns the number of pixels which do not match between the images
 */
export async function compareImages(pathOne: string, pathTwo: string): Promise<number> {
    const img1 = await Jimp.read(pathOne);
    const img2 = await Jimp.read(pathTwo);

    if (img1.bitmap.width !== img2.bitmap.width || img1.bitmap.height !== img2.bitmap.height) {
        throw new Error('Images must have the same dimensions for comparison');
    }

    const Pixelmatch = (await import('pixelmatch')).default;

    const pixelMismatchCount = Pixelmatch(
        img1.bitmap.data,
        img2.bitmap.data,
        null, // no diff output image needed
        img1.bitmap.width,
        img1.bitmap.height,
        { threshold: 0.1 }
    );

    return pixelMismatchCount;
}
