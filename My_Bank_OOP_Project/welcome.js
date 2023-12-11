import chalkAnimation from "chalk-animation";
const sleep = () => {
    return new Promise((res) => {
        setTimeout(res, 2500);
    });
};
async function welcome() {
    let title = chalkAnimation.rainbow(`           Welcome To SBL Digital Banking Service\n`);
    await sleep();
    title.stop();
}
export { welcome };
