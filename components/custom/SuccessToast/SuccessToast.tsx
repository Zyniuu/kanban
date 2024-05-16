import { useToast } from "@/components/ui/use-toast";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";


const SuccessToast = () => {
    const tToast = useTranslations('Toasts');
    const searchParams = useSearchParams();
    const { toast } = useToast();
    let wasShown = useRef(false);

    if(!wasShown.current && searchParams.get('redirect') === 'signup-success') {
        setTimeout(() => {
            toast({
                title: tToast('signupSuccessTitle'),
                description: tToast('signupSuccessDesc'),
                variant: 'success',
            });
        });
        wasShown.current = true;
    }

    return (
        <span></span>
    )
}

export default SuccessToast