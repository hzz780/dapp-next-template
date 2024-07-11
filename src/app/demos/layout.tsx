import Footer from '@/components/Footer';

import { menuList} from '@/config/demo/configMenu';
import { MenuCustom } from '@/components/demo/Menu';

export default function HelloLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col h-screen min-w-full break-all pt-[60px] lg:pt-[80px]">
      <div className="flex flex-1 overflow-scroll min-w-full">
        <div className="flex h-full min-w-full break-all">
          <div className="hidden md:flex flex-col lg:w-1/6 bg-white h-full">
            <MenuCustom menuList={menuList} />
          </div>
          <div className="flex-initial lg:w-5/6 w-full h-full bg-white border-y-[1px] border-gray-100">{children}</div>
        </div>
      </div>
      <Footer />
    </section>
  )
}
