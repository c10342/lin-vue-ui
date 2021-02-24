import LinMessageBox from './message-box.vue';

export type BeforeClose = (
    value: { by: string },
    instance: LinMessageBox,
    done: () => void
) => void
