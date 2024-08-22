import React from 'react';
import providerList from '@/data/providers/list';
import { BsArrowRight } from 'react-icons/bs';
import AddProvider from './AddProvider';
export type ProviderType = {
  name: string,
  type : string,
  icon:string
}
function ProviderList() {
  const [openAddProvider, setOpenAddProvider] = React.useState<boolean | ProviderType >(false);
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-white mb-8 flex gap-3 items-center">
        Available Providers
        <BsArrowRight />
      </h1>

      <h2 className="font-semibold text-white mb-4">Email</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {providerList.email.map((provider, index) => (
          <div
            key={index}
            onClick={
              () => {
                setOpenAddProvider({
                  name: provider.name,
                  type: 'email',
                  icon:provider.icon
                })
              }
            }
            className="flex cursor-pointer items-center p-4 bg-slate-700  rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {provider.icon && (
              <img src={provider.icon} alt={provider.name} className="w-10 h-10 mr-4" />
            )}
            <span className="text-lg font-medium text-white">{provider.name}</span>
          </div>
        ))}
      </div>

      <h2 className="font-semibold text-white mt-8 mb-4">Messaging</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {providerList.msg.map((provider, index) => (
          <div
            onClick={
              () => {
                setOpenAddProvider({
                  name: provider.name,
                  type: 'msg',
                  icon:provider.icon
                })
              }
            }
            key={index}
            className="flex items-center cursor-pointer p-4 bg-slate-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {provider.icon && (
              <img src={provider.icon} alt={provider.name} className="w-10 h-10 mr-4" />
            )}
            <span className="text-lg font-medium text-white">{provider.name}</span>
          </div>
        ))}
      </div>

        {
          openAddProvider&&(
            <>
              <AddProvider setOpenAddProvider={setOpenAddProvider} provider={openAddProvider} />
            </>
          )
        }

    </div>
  );
}

export default ProviderList;
