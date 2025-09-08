import { type RefObject, useEffect, useState } from "react";

const useCloseWhenClickOutside = (ref: RefObject<HTMLDivElement | null>) => {
    const [show, setShow] = useState(false);

    const close = () => setShow(false);

    useEffect(() => {
        if (!show) return;

        const handleClick = (event: MouseEvent) => {
            if (
                ref.current &&
                event.target instanceof Node &&
                !ref.current.contains(event.target)
            ) {
                close();
            }
        };

        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [show, ref]);

    return { show, setShow };
};

export { useCloseWhenClickOutside };
