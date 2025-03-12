export const SkeletonCard: React.FC = () => {
  return (
    <div className="shadow-2xl rounded-lg animate-pulse">
      <div className="bg-white rounded-lg shadow-md flex flex-col">
        <div className="flex flex-row items-center justify-between rounded-t-lg px-5 py-7 filter brightness-[100%] bg-[#ebebeb98]">
          <span className="text-[1.2rem] font-semibold whitespace-nowrap overflow-hidden text-ellipsis p-2 w-24 skeleton"></span>

          <div className="ml-4 skeleton p-3 rounded-md"></div>
        </div>

        <div className="p-5">
          <span className=" text-gray-950 px-20 roun skeleton"></span>

          <div className="flex flex-row gap-2 pb-1 pt-5 whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="w-12 max-w-full rounded-xl border py-1 px-3 font-light text-xs text-white skeleton select-none text-ellipsis overflow-hidden hitespace-nowrap h-5"></span>

            <span className="w-14 max-w-full rounded-xl borderpy-1 px-2 font-light text-xs text-black select-none skeleton text-ellipsis overflow-hidden hitespace-nowrap"></span>
          </div>
        </div>

        <div className=" bg-[#ebebeb98] flex justify-between px-5 py-3 rounded-b-lg">
          <div className="skeleton p-3 rounded-md"></div>
          <span className="font-extralight text-sm text-black whitespace-nowrap overflow-hidden text-ellipsis select-none skeleton w-24 rounded-md"></span>
        </div>
      </div>
    </div>
  );
};
