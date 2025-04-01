export const sanitizeInput = (UNSAFE: string) => {
    const decoder = document.createElement('div');
    decoder.innerHTML = UNSAFE;
    const sanitized = decoder.textContent;
    return sanitized;
};

export const getFormDataFromEvent = (
    event: React.FormEvent<HTMLFormElement>
): { [k: string]: FormDataEntryValue } => {
    const formData = new FormData(event.target as HTMLFormElement);
    return Object.fromEntries(formData);
};

interface DownloadOptions {
    filename?: string;
    content?: string | Blob;
    mimeType?: string;
    autoRevoke?: boolean;
}

export const onFileDownload = (options: DownloadOptions = {}): void => {
    const {
        filename = 'hello.txt',
        content = 'Hello, world!',
        mimeType = 'text/plain',
        autoRevoke = true,
    } = options;

    const blob: Blob =
        content instanceof Blob
            ? content
            : new Blob([content], { type: mimeType });

    const link = document.createElement('a');
    link.download = filename;
    link.href = URL.createObjectURL(blob);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (autoRevoke) {
        URL.revokeObjectURL(link.href);
    }
};

export const openUrl = (to: string): unknown => window?.open(to, '_blank');

interface InertElement extends HTMLElement {
    inert: boolean;
}

export const inertMain = (status = true): void => {
    const main = document?.querySelector('main');
    if (main != null) (main as InertElement).inert = status;
};

/*
paragraph.addEventListener("mouseover", function (event) {
  if (!isInside(event.relatedTarget, paragraph)) paragraph.style.color = "red";
});
*/
export const isInside = (node: Node | null, target: Node) => {
    for (; node != null; node = node.parentNode)
        if (node === target) return true;
};

export const hasInputDateSupport = () => {
    const input = document.createElement('input');
    input.type = 'date';
    input.value = 'invalid date value';
    return input.value !== 'invalid date value';
};

export const scrollToElement = (selector: string): void => {
    const el = document.querySelector(selector);
    if (el != null) {
        el.scrollIntoView();
    }
};

export const paintBody = (): void => {
    const body = document.querySelector('body');
    if (body !== null) {
        body.style.backgroundColor = `#${Math.floor(
            Math.random() * 16777215
        ).toString(16)}`;
    }
};
