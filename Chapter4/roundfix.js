const roundFix = (
    () => {
        let accum = 0;

        return n => {
            // reals get rounded up or down
            // depending on the sign of accum
            let nRounded = accum > 0 ? Math.ceil(n) : Math.floor(n);
            console.log(`accum ${accum.toFixed(5)} result ${nRounded}`);
            accum += (n - nRounded);
            return nRounded;
        }
    }
)();

roundFix(3.14159);
roundFix(2.71828);
roundFix(2.71828);
roundFix(3.14159);
roundFix(2.71828);
roundFix(2.71828);
roundFix(2.71828);