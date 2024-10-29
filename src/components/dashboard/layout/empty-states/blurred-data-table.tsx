export default function BlurredDataTable() {
	return (
		<div className="flex flex-col pb-20">
			<div className="flex flex-wrap gap-10 justify-between py-8 w-full max-md:max-w-full">
				<div className="flex items-center pr-6 h-full min-w-[240px] w-[372px]">
					<div className="flex relative flex-col items-start self-stretch my-auto min-w-[240px] w-[350px]">
						<div className="flex overflow-hidden z-0 flex-col justify-center self-stretch px-9 py-3.5 w-full text-xl border border-solid border-zinc-800 text-zinc-600 max-md:px-5">
							<div className="overflow-hidden pr-32 min-h-[23px] max-md:pr-5">
								Search or filter
							</div>
						</div>
						<img
							loading="lazy"
							src="https://cdn.builder.io/api/v1/image/assets/TEMP/5709baf91b83b4cf6e0db20a3ae2e6727fabc497f6a25ffdf87c89c6d9df9051?placeholderIfAbsent=true&apiKey=3cf1db2ab1694ce4be6d4ee2ec473197"
							className="object-contain absolute z-0 aspect-square h-[22px] left-[17px] top-[11px] w-[22px]"
						/>
						<div className="flex absolute top-2.5 right-4 z-0 flex-col w-[22px]">
							<img
								loading="lazy"
								src="https://cdn.builder.io/api/v1/image/assets/TEMP/9e6734292787d6a6d6f1f28fea14a2ac67353f7eeed60d100e1e1fa27c059386?placeholderIfAbsent=true&apiKey=3cf1db2ab1694ce4be6d4ee2ec473197"
								className="object-contain w-full aspect-square"
							/>
						</div>
					</div>
				</div>
				<img
					loading="lazy"
					src="https://cdn.builder.io/api/v1/image/assets/TEMP/e6f91509bb16fd28a2e06fe0a0ad3bcb02f5c8fb32b0539969244baa2ea30cbc?placeholderIfAbsent=true&apiKey=3cf1db2ab1694ce4be6d4ee2ec473197"
					className="object-contain shrink-0 aspect-[2.2] w-[110px]"
				/>
			</div>
			<div className="flex flex-col justify-center py-px w-full max-md:max-w-full">
				<div className="flex flex-col justify-center w-full border border-solid border-zinc-800 min-h-[73px] max-md:max-w-full">
					<div className="flex flex-wrap justify-center items-center w-full border-b border-solid border-b-zinc-800 min-h-[73px] max-md:max-w-full">
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-7 pr-px pl-6 my-auto w-12 border-r border-solid border-r-zinc-800 min-h-[73px] max-md:pl-5">
							<div className="flex border border-solid border-zinc-800 h-[22px] min-h-[22px] w-[22px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-3 py-3 pr-6 pl-6 my-auto text-xl font-medium leading-7 text-center whitespace-nowrap border-r border-solid border-r-zinc-800 min-h-[73px] text-neutral-50 w-[108px] max-md:px-5">
							<div className="flex justify-center items-center py-3 min-h-[50px]">
								<div className="self-stretch my-auto">Date</div>
							</div>
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-3 py-3 pr-6 pl-6 my-auto text-xl font-medium leading-7 text-center whitespace-nowrap border-r border-solid border-r-zinc-800 min-h-[73px] min-w-[240px] text-neutral-50 w-[418px] max-md:px-5 max-md:max-w-full">
							<div className="flex justify-center items-center py-3 min-h-[50px]">
								<div className="self-stretch my-auto">
									Description
								</div>
							</div>
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-3 py-3 pr-6 pl-6 my-auto text-xl font-medium leading-7 text-center whitespace-nowrap border-r border-solid border-r-zinc-800 min-h-[73px] text-neutral-50 w-[188px] max-md:px-5">
							<div className="flex justify-center items-center py-3 min-h-[50px]">
								<div className="self-stretch my-auto">
									Amount
								</div>
							</div>
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-3 py-3 pr-6 pl-6 my-auto text-xl font-medium leading-7 text-center whitespace-nowrap border-r border-solid border-r-zinc-800 min-h-[73px] min-w-[240px] text-neutral-50 w-[248px] max-md:px-5">
							<div className="flex justify-center items-center py-3 min-h-[50px]">
								<div className="self-stretch my-auto">
									Category
								</div>
							</div>
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-3 py-3 pr-6 pl-6 my-auto text-xl font-medium leading-7 text-center whitespace-nowrap border-r border-solid border-r-zinc-800 min-h-[73px] min-w-[240px] text-neutral-50 w-[238px] max-md:px-5">
							<div className="flex justify-center items-center py-3 min-h-[50px]">
								<div className="self-stretch my-auto">
									Account
								</div>
							</div>
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-3 py-3 pr-6 pl-6 my-auto text-xl font-medium leading-7 text-center whitespace-nowrap border-r border-solid border-r-zinc-800 min-h-[73px] text-neutral-50 w-[188px] max-md:px-5">
							<div className="flex justify-center items-center py-3 min-h-[50px]">
								<div className="self-stretch my-auto">
									Method
								</div>
							</div>
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-3 py-3 pr-6 pl-6 my-auto w-52 text-xl font-medium leading-7 text-center whitespace-nowrap border-r border-solid border-r-zinc-800 min-h-[73px] text-neutral-50 max-md:px-5">
							<div className="flex justify-center items-center py-3 min-h-[50px]">
								<div className="self-stretch my-auto">
									Assigned
								</div>
							</div>
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-3 my-auto text-xl font-medium leading-7 text-center whitespace-nowrap min-h-[73px] min-w-[240px] text-neutral-50 w-[1613px] max-md:px-5 max-md:max-w-full">
							<div className="flex justify-center items-center py-3 min-h-[50px]">
								<div className="self-stretch my-auto">
									Status
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col justify-center w-full border border-solid border-zinc-800 max-md:max-w-full">
					<div className="flex flex-wrap justify-center items-center w-full border-b border-solid border-b-zinc-800 min-h-[51px] pr-[1625px] max-md:pr-5 max-md:max-w-full">
						<div className="flex flex-col grow shrink justify-center self-stretch py-4 pr-6 pl-6 my-auto w-12 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex bg-zinc-50 bg-opacity-10 min-h-[20px] w-[15px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto w-[108px] max-md:px-5">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[45px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[418px] max-md:px-5 max-md:max-w-full">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[193px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-8 py-4 my-auto w-[188px] max-md:px-5">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[78px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[248px] max-md:px-5">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[129px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] min-w-[240px] w-[238px] max-md:px-5">
							<div className="flex w-20 bg-zinc-50 bg-opacity-10 min-h-[20px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-3 py-3 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] w-[188px] max-md:px-5">
							<div className="flex items-center max-w-full w-[124px]">
								<div className="flex shrink-0 self-stretch my-auto rounded-full bg-zinc-50 bg-opacity-10 h-[27px] w-[27px]" />
								<div className="flex flex-col flex-1 shrink self-stretch pl-3 my-auto basis-0 min-h-[19px]">
									<div className="flex w-full bg-zinc-50 bg-opacity-10 min-h-[19px]" />
								</div>
							</div>
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto w-52 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex w-5 h-5 rounded-full bg-zinc-50 bg-opacity-10 min-h-[20px]" />
						</div>
					</div>
					<div className="flex flex-wrap justify-center items-center w-full border-b border-solid border-b-zinc-800 min-h-[51px] pr-[1625px] max-md:pr-5 max-md:max-w-full">
						<div className="flex flex-col grow shrink justify-center self-stretch py-4 pr-6 pl-6 my-auto w-12 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex bg-zinc-50 bg-opacity-10 min-h-[19px] w-[15px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto w-[108px] max-md:px-5">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[45px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[418px] max-md:px-5 max-md:max-w-full">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[193px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-8 py-4 my-auto w-[188px] max-md:px-5">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[78px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[248px] max-md:px-5">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[129px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] min-w-[240px] w-[238px] max-md:px-5">
							<div className="flex w-20 bg-zinc-50 bg-opacity-10 min-h-[19px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-3 py-3 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] w-[188px] max-md:px-5">
							<div className="flex items-center max-w-full w-[124px]">
								<div className="flex shrink-0 self-stretch my-auto h-7 rounded-full bg-zinc-50 bg-opacity-10 w-[27px]" />
								<div className="flex flex-col flex-1 shrink self-stretch pl-3 my-auto basis-0 min-h-[19px]">
									<div className="flex w-full bg-zinc-50 bg-opacity-10 min-h-[20px]" />
								</div>
							</div>
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto w-52 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex w-5 h-5 rounded-full bg-zinc-50 bg-opacity-10 min-h-[20px]" />
						</div>
					</div>
					<div className="flex flex-wrap justify-center items-center w-full border-b border-solid border-b-zinc-800 min-h-[51px] pr-[1625px] max-md:pr-5 max-md:max-w-full">
						<div className="flex flex-col grow shrink justify-center self-stretch py-4 pr-6 pl-6 my-auto w-12 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex bg-zinc-50 bg-opacity-10 min-h-[20px] w-[15px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto w-[108px] max-md:px-5">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[45px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[418px] max-md:px-5 max-md:max-w-full">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[193px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-8 py-4 my-auto w-[188px] max-md:px-5">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[78px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[248px] max-md:px-5">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[129px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] min-w-[240px] w-[238px] max-md:px-5">
							<div className="flex w-20 bg-zinc-50 bg-opacity-10 min-h-[20px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-3 py-3 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] w-[188px] max-md:px-5">
							<div className="flex items-center max-w-full w-[124px]">
								<div className="flex shrink-0 self-stretch my-auto rounded-full bg-zinc-50 bg-opacity-10 h-[27px] w-[27px]" />
								<div className="flex flex-col flex-1 shrink self-stretch pl-3 my-auto basis-0 min-h-[19px]">
									<div className="flex w-full bg-zinc-50 bg-opacity-10 min-h-[19px]" />
								</div>
							</div>
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto w-52 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex w-5 h-5 rounded-full bg-zinc-50 bg-opacity-10 min-h-[20px]" />
						</div>
					</div>
					<div className="flex flex-wrap justify-center items-center w-full border-b border-solid border-b-zinc-800 min-h-[51px] pr-[1625px] max-md:pr-5 max-md:max-w-full">
						<div className="flex flex-col grow shrink justify-center self-stretch py-4 pr-6 pl-6 my-auto w-12 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex bg-zinc-50 bg-opacity-10 min-h-[19px] w-[15px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto w-[108px] max-md:px-5">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[45px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[418px] max-md:px-5 max-md:max-w-full">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[193px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-8 py-4 my-auto w-[188px] max-md:px-5">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[78px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[248px] max-md:px-5">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[129px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] min-w-[240px] w-[238px] max-md:px-5">
							<div className="flex w-20 bg-zinc-50 bg-opacity-10 min-h-[19px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-3 py-3 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] w-[188px] max-md:px-5">
							<div className="flex items-center max-w-full w-[124px]">
								<div className="flex shrink-0 self-stretch my-auto h-7 rounded-full bg-zinc-50 bg-opacity-10 w-[27px]" />
								<div className="flex flex-col flex-1 shrink self-stretch pl-3 my-auto basis-0 min-h-[19px]">
									<div className="flex w-full bg-zinc-50 bg-opacity-10 min-h-[20px]" />
								</div>
							</div>
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto w-52 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex w-5 h-5 rounded-full bg-zinc-50 bg-opacity-10 min-h-[20px]" />
						</div>
					</div>
					<div className="flex flex-wrap justify-center items-center w-full border-b border-solid border-b-zinc-800 min-h-[51px] pr-[1625px] max-md:pr-5 max-md:max-w-full">
						<div className="flex flex-col grow shrink justify-center self-stretch py-4 pr-6 pl-6 my-auto w-12 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex bg-zinc-50 bg-opacity-10 min-h-[20px] w-[15px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto w-[108px] max-md:px-5">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[45px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[418px] max-md:px-5 max-md:max-w-full">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[193px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-8 py-4 my-auto w-[188px] max-md:px-5">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[78px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[248px] max-md:px-5">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[129px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] min-w-[240px] w-[238px] max-md:px-5">
							<div className="flex w-20 bg-zinc-50 bg-opacity-10 min-h-[20px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-3 py-3 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] w-[188px] max-md:px-5">
							<div className="flex items-center max-w-full w-[124px]">
								<div className="flex shrink-0 self-stretch my-auto rounded-full bg-zinc-50 bg-opacity-10 h-[27px] w-[27px]" />
								<div className="flex flex-col flex-1 shrink self-stretch pl-3 my-auto basis-0 min-h-[19px]">
									<div className="flex w-full bg-zinc-50 bg-opacity-10 min-h-[19px]" />
								</div>
							</div>
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto w-52 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex w-5 h-5 rounded-full bg-zinc-50 bg-opacity-10 min-h-[20px]" />
						</div>
					</div>
					<div className="flex flex-wrap justify-center items-center w-full border-b border-solid border-b-zinc-800 min-h-[51px] pr-[1625px] max-md:pr-5 max-md:max-w-full">
						<div className="flex flex-col grow shrink justify-center self-stretch py-4 pr-6 pl-6 my-auto w-12 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex bg-zinc-50 bg-opacity-10 min-h-[19px] w-[15px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto w-[108px] max-md:px-5">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[45px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[418px] max-md:px-5 max-md:max-w-full">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[193px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-8 py-4 my-auto w-[188px] max-md:px-5">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[78px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[248px] max-md:px-5">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[129px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] min-w-[240px] w-[238px] max-md:px-5">
							<div className="flex w-20 bg-zinc-50 bg-opacity-10 min-h-[19px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-3 py-3 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] w-[188px] max-md:px-5">
							<div className="flex items-center max-w-full w-[124px]">
								<div className="flex shrink-0 self-stretch my-auto h-7 rounded-full bg-zinc-50 bg-opacity-10 w-[27px]" />
								<div className="flex flex-col flex-1 shrink self-stretch pl-3 my-auto basis-0 min-h-[19px]">
									<div className="flex w-full bg-zinc-50 bg-opacity-10 min-h-[20px]" />
								</div>
							</div>
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto w-52 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex w-5 h-5 rounded-full bg-zinc-50 bg-opacity-10 min-h-[20px]" />
						</div>
					</div>
					<div className="flex flex-wrap justify-center items-center w-full border-b border-solid border-b-zinc-800 min-h-[51px] pr-[1625px] max-md:pr-5 max-md:max-w-full">
						<div className="flex flex-col grow shrink justify-center self-stretch py-4 pr-6 pl-6 my-auto w-12 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex bg-zinc-50 bg-opacity-10 min-h-[20px] w-[15px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto w-[108px] max-md:px-5">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[45px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[418px] max-md:px-5 max-md:max-w-full">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[193px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-8 py-4 my-auto w-[188px] max-md:px-5">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[78px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[248px] max-md:px-5">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[129px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] min-w-[240px] w-[238px] max-md:px-5">
							<div className="flex w-20 bg-zinc-50 bg-opacity-10 min-h-[20px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-3 py-3 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] w-[188px] max-md:px-5">
							<div className="flex items-center max-w-full w-[124px]">
								<div className="flex shrink-0 self-stretch my-auto rounded-full bg-zinc-50 bg-opacity-10 h-[27px] w-[27px]" />
								<div className="flex flex-col flex-1 shrink self-stretch pl-3 my-auto basis-0 min-h-[19px]">
									<div className="flex w-full bg-zinc-50 bg-opacity-10 min-h-[19px]" />
								</div>
							</div>
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto w-52 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex w-5 h-5 rounded-full bg-zinc-50 bg-opacity-10 min-h-[20px]" />
						</div>
					</div>
					<div className="flex flex-wrap justify-center items-center w-full border-b border-solid border-b-zinc-800 min-h-[51px] pr-[1625px] max-md:pr-5 max-md:max-w-full">
						<div className="flex flex-col grow shrink justify-center self-stretch py-4 pr-6 pl-6 my-auto w-12 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex bg-zinc-50 bg-opacity-10 min-h-[19px] w-[15px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto w-[108px] max-md:px-5">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[45px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[418px] max-md:px-5 max-md:max-w-full">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[193px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-8 py-4 my-auto w-[188px] max-md:px-5">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[78px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[248px] max-md:px-5">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[129px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] min-w-[240px] w-[238px] max-md:px-5">
							<div className="flex w-20 bg-zinc-50 bg-opacity-10 min-h-[19px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-3 py-3 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] w-[188px] max-md:px-5">
							<div className="flex items-center max-w-full w-[124px]">
								<div className="flex shrink-0 self-stretch my-auto h-7 rounded-full bg-zinc-50 bg-opacity-10 w-[27px]" />
								<div className="flex flex-col flex-1 shrink self-stretch pl-3 my-auto basis-0 min-h-[19px]">
									<div className="flex w-full bg-zinc-50 bg-opacity-10 min-h-[20px]" />
								</div>
							</div>
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto w-52 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex w-5 h-5 rounded-full bg-zinc-50 bg-opacity-10 min-h-[20px]" />
						</div>
					</div>
					<div className="flex flex-wrap justify-center items-center w-full border-b border-solid border-b-zinc-800 min-h-[51px] pr-[1625px] max-md:pr-5 max-md:max-w-full">
						<div className="flex flex-col grow shrink justify-center self-stretch py-4 pr-6 pl-6 my-auto w-12 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex bg-zinc-50 bg-opacity-10 min-h-[20px] w-[15px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto w-[108px] max-md:px-5">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[45px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[418px] max-md:px-5 max-md:max-w-full">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[193px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-8 py-4 my-auto w-[188px] max-md:px-5">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[78px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[248px] max-md:px-5">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[129px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] min-w-[240px] w-[238px] max-md:px-5">
							<div className="flex w-20 bg-zinc-50 bg-opacity-10 min-h-[20px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-3 py-3 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] w-[188px] max-md:px-5">
							<div className="flex items-center max-w-full w-[124px]">
								<div className="flex shrink-0 self-stretch my-auto rounded-full bg-zinc-50 bg-opacity-10 h-[27px] w-[27px]" />
								<div className="flex flex-col flex-1 shrink self-stretch pl-3 my-auto basis-0 min-h-[19px]">
									<div className="flex w-full bg-zinc-50 bg-opacity-10 min-h-[19px]" />
								</div>
							</div>
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto w-52 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex w-5 h-5 rounded-full bg-zinc-50 bg-opacity-10 min-h-[20px]" />
						</div>
					</div>
					<div className="flex flex-wrap justify-center items-center w-full border-b border-solid border-b-zinc-800 min-h-[51px] pr-[1625px] max-md:pr-5 max-md:max-w-full">
						<div className="flex flex-col grow shrink justify-center self-stretch py-4 pr-6 pl-6 my-auto w-12 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex bg-zinc-50 bg-opacity-10 min-h-[19px] w-[15px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto w-[108px] max-md:px-5">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[45px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[418px] max-md:px-5 max-md:max-w-full">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[193px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-8 py-4 my-auto w-[188px] max-md:px-5">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[78px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[248px] max-md:px-5">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[129px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] min-w-[240px] w-[238px] max-md:px-5">
							<div className="flex w-20 bg-zinc-50 bg-opacity-10 min-h-[19px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-3 py-3 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] w-[188px] max-md:px-5">
							<div className="flex items-center max-w-full w-[124px]">
								<div className="flex shrink-0 self-stretch my-auto h-7 rounded-full bg-zinc-50 bg-opacity-10 w-[27px]" />
								<div className="flex flex-col flex-1 shrink self-stretch pl-3 my-auto basis-0 min-h-[19px]">
									<div className="flex w-full bg-zinc-50 bg-opacity-10 min-h-[20px]" />
								</div>
							</div>
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto w-52 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex w-5 h-5 rounded-full bg-zinc-50 bg-opacity-10 min-h-[20px]" />
						</div>
					</div>
					<div className="flex flex-wrap justify-center items-center w-full border-b border-solid border-b-zinc-800 min-h-[51px] pr-[1625px] max-md:pr-5 max-md:max-w-full">
						<div className="flex flex-col grow shrink justify-center self-stretch py-4 pr-6 pl-6 my-auto w-12 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex bg-zinc-50 bg-opacity-10 min-h-[20px] w-[15px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto w-[108px] max-md:px-5">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[45px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[418px] max-md:px-5 max-md:max-w-full">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[193px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-8 py-4 my-auto w-[188px] max-md:px-5">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[78px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[248px] max-md:px-5">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[129px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] min-w-[240px] w-[238px] max-md:px-5">
							<div className="flex w-20 bg-zinc-50 bg-opacity-10 min-h-[20px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-3 py-3 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] w-[188px] max-md:px-5">
							<div className="flex items-center max-w-full w-[124px]">
								<div className="flex shrink-0 self-stretch my-auto rounded-full bg-zinc-50 bg-opacity-10 h-[27px] w-[27px]" />
								<div className="flex flex-col flex-1 shrink self-stretch pl-3 my-auto basis-0 min-h-[19px]">
									<div className="flex w-full bg-zinc-50 bg-opacity-10 min-h-[19px]" />
								</div>
							</div>
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto w-52 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex w-5 h-5 rounded-full bg-zinc-50 bg-opacity-10 min-h-[20px]" />
						</div>
					</div>
					<div className="flex flex-wrap justify-center items-center w-full border-b border-solid border-b-zinc-800 min-h-[51px] pr-[1625px] max-md:pr-5 max-md:max-w-full">
						<div className="flex flex-col grow shrink justify-center self-stretch py-4 pr-6 pl-6 my-auto w-12 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex bg-zinc-50 bg-opacity-10 min-h-[19px] w-[15px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto w-[108px] max-md:px-5">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[45px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[418px] max-md:px-5 max-md:max-w-full">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[193px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-8 py-4 my-auto w-[188px] max-md:px-5">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[78px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[248px] max-md:px-5">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[129px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] min-w-[240px] w-[238px] max-md:px-5">
							<div className="flex w-20 bg-zinc-50 bg-opacity-10 min-h-[19px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-3 py-3 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] w-[188px] max-md:px-5">
							<div className="flex items-center max-w-full w-[124px]">
								<div className="flex shrink-0 self-stretch my-auto h-7 rounded-full bg-zinc-50 bg-opacity-10 w-[27px]" />
								<div className="flex flex-col flex-1 shrink self-stretch pl-3 my-auto basis-0 min-h-[19px]">
									<div className="flex w-full bg-zinc-50 bg-opacity-10 min-h-[20px]" />
								</div>
							</div>
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto w-52 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex w-5 h-5 rounded-full bg-zinc-50 bg-opacity-10 min-h-[20px]" />
						</div>
					</div>
					<div className="flex flex-wrap justify-center items-center w-full border-b border-solid border-b-zinc-800 min-h-[51px] pr-[1625px] max-md:pr-5 max-md:max-w-full">
						<div className="flex flex-col grow shrink justify-center self-stretch py-4 pr-6 pl-6 my-auto w-12 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex bg-zinc-50 bg-opacity-10 min-h-[20px] w-[15px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto w-[108px] max-md:px-5">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[45px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[418px] max-md:px-5 max-md:max-w-full">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[193px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-8 py-4 my-auto w-[188px] max-md:px-5">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[78px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[248px] max-md:px-5">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[129px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] min-w-[240px] w-[238px] max-md:px-5">
							<div className="flex w-20 bg-zinc-50 bg-opacity-10 min-h-[20px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-3 py-3 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] w-[188px] max-md:px-5">
							<div className="flex items-center max-w-full w-[124px]">
								<div className="flex shrink-0 self-stretch my-auto rounded-full bg-zinc-50 bg-opacity-10 h-[27px] w-[27px]" />
								<div className="flex flex-col flex-1 shrink self-stretch pl-3 my-auto basis-0 min-h-[19px]">
									<div className="flex w-full bg-zinc-50 bg-opacity-10 min-h-[19px]" />
								</div>
							</div>
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto w-52 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex w-5 h-5 rounded-full bg-zinc-50 bg-opacity-10 min-h-[20px]" />
						</div>
					</div>
					<div className="flex flex-wrap justify-center items-center w-full border-b border-solid border-b-zinc-800 min-h-[51px] pr-[1625px] max-md:pr-5 max-md:max-w-full">
						<div className="flex flex-col grow shrink justify-center self-stretch py-4 pr-6 pl-6 my-auto w-12 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex bg-zinc-50 bg-opacity-10 min-h-[19px] w-[15px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto w-[108px] max-md:px-5">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[45px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[418px] max-md:px-5 max-md:max-w-full">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[193px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-8 py-4 my-auto w-[188px] max-md:px-5">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[78px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[248px] max-md:px-5">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[129px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] min-w-[240px] w-[238px] max-md:px-5">
							<div className="flex w-20 bg-zinc-50 bg-opacity-10 min-h-[19px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-3 py-3 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] w-[188px] max-md:px-5">
							<div className="flex items-center max-w-full w-[124px]">
								<div className="flex shrink-0 self-stretch my-auto h-7 rounded-full bg-zinc-50 bg-opacity-10 w-[27px]" />
								<div className="flex flex-col flex-1 shrink self-stretch pl-3 my-auto basis-0 min-h-[19px]">
									<div className="flex w-full bg-zinc-50 bg-opacity-10 min-h-[20px]" />
								</div>
							</div>
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto w-52 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex w-5 h-5 rounded-full bg-zinc-50 bg-opacity-10 min-h-[20px]" />
						</div>
					</div>
					<div className="flex flex-wrap justify-center items-center w-full border-b border-solid border-b-zinc-800 min-h-[51px] pr-[1625px] max-md:pr-5 max-md:max-w-full">
						<div className="flex flex-col grow shrink justify-center self-stretch py-4 pr-6 pl-6 my-auto w-12 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex bg-zinc-50 bg-opacity-10 min-h-[20px] w-[15px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto w-[108px] max-md:px-5">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[45px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[418px] max-md:px-5 max-md:max-w-full">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[193px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-8 py-4 my-auto w-[188px] max-md:px-5">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[78px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[248px] max-md:px-5">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[129px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] min-w-[240px] w-[238px] max-md:px-5">
							<div className="flex w-20 bg-zinc-50 bg-opacity-10 min-h-[20px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-3 py-3 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] w-[188px] max-md:px-5">
							<div className="flex items-center max-w-full w-[124px]">
								<div className="flex shrink-0 self-stretch my-auto rounded-full bg-zinc-50 bg-opacity-10 h-[27px] w-[27px]" />
								<div className="flex flex-col flex-1 shrink self-stretch pl-3 my-auto basis-0 min-h-[19px]">
									<div className="flex w-full bg-zinc-50 bg-opacity-10 min-h-[19px]" />
								</div>
							</div>
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto w-52 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex w-5 h-5 rounded-full bg-zinc-50 bg-opacity-10 min-h-[20px]" />
						</div>
					</div>
					<div className="flex flex-wrap justify-center items-center w-full border-b border-solid border-b-zinc-800 min-h-[51px] pr-[1625px] max-md:pr-5 max-md:max-w-full">
						<div className="flex flex-col grow shrink justify-center self-stretch py-4 pr-6 pl-6 my-auto w-12 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex bg-zinc-50 bg-opacity-10 min-h-[19px] w-[15px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto w-[108px] max-md:px-5">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[45px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[418px] max-md:px-5 max-md:max-w-full">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[193px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-8 py-4 my-auto w-[188px] max-md:px-5">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[78px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[248px] max-md:px-5">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[129px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] min-w-[240px] w-[238px] max-md:px-5">
							<div className="flex w-20 bg-zinc-50 bg-opacity-10 min-h-[19px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-3 py-3 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] w-[188px] max-md:px-5">
							<div className="flex items-center max-w-full w-[124px]">
								<div className="flex shrink-0 self-stretch my-auto h-7 rounded-full bg-zinc-50 bg-opacity-10 w-[27px]" />
								<div className="flex flex-col flex-1 shrink self-stretch pl-3 my-auto basis-0 min-h-[19px]">
									<div className="flex w-full bg-zinc-50 bg-opacity-10 min-h-[20px]" />
								</div>
							</div>
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto w-52 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex w-5 h-5 rounded-full bg-zinc-50 bg-opacity-10 min-h-[20px]" />
						</div>
					</div>
					<div className="flex flex-wrap justify-center items-center w-full border-b border-solid border-b-zinc-800 min-h-[51px] pr-[1625px] max-md:pr-5 max-md:max-w-full">
						<div className="flex flex-col grow shrink justify-center self-stretch py-4 pr-6 pl-6 my-auto w-12 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex bg-zinc-50 bg-opacity-10 min-h-[20px] w-[15px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto w-[108px] max-md:px-5">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[45px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[418px] max-md:px-5 max-md:max-w-full">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[193px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-8 py-4 my-auto w-[188px] max-md:px-5">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[78px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[248px] max-md:px-5">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[129px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] min-w-[240px] w-[238px] max-md:px-5">
							<div className="flex w-20 bg-zinc-50 bg-opacity-10 min-h-[20px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-3 py-3 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] w-[188px] max-md:px-5">
							<div className="flex items-center max-w-full w-[124px]">
								<div className="flex shrink-0 self-stretch my-auto rounded-full bg-zinc-50 bg-opacity-10 h-[27px] w-[27px]" />
								<div className="flex flex-col flex-1 shrink self-stretch pl-3 my-auto basis-0 min-h-[19px]">
									<div className="flex w-full bg-zinc-50 bg-opacity-10 min-h-[19px]" />
								</div>
							</div>
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto w-52 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex w-5 h-5 rounded-full bg-zinc-50 bg-opacity-10 min-h-[20px]" />
						</div>
					</div>
					<div className="flex flex-wrap justify-center items-center w-full border-b border-solid border-b-zinc-800 min-h-[51px] pr-[1625px] max-md:pr-5 max-md:max-w-full">
						<div className="flex flex-col grow shrink justify-center self-stretch py-4 pr-6 pl-6 my-auto w-12 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex bg-zinc-50 bg-opacity-10 min-h-[19px] w-[15px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto w-[108px] max-md:px-5">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[45px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[418px] max-md:px-5 max-md:max-w-full">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[193px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-8 py-4 my-auto w-[188px] max-md:px-5">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[78px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[248px] max-md:px-5">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[129px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] min-w-[240px] w-[238px] max-md:px-5">
							<div className="flex w-20 bg-zinc-50 bg-opacity-10 min-h-[19px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-3 py-3 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] w-[188px] max-md:px-5">
							<div className="flex items-center max-w-full w-[124px]">
								<div className="flex shrink-0 self-stretch my-auto h-7 rounded-full bg-zinc-50 bg-opacity-10 w-[27px]" />
								<div className="flex flex-col flex-1 shrink self-stretch pl-3 my-auto basis-0 min-h-[19px]">
									<div className="flex w-full bg-zinc-50 bg-opacity-10 min-h-[20px]" />
								</div>
							</div>
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto w-52 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex w-5 h-5 rounded-full bg-zinc-50 bg-opacity-10 min-h-[20px]" />
						</div>
					</div>
					<div className="flex flex-wrap justify-center items-center w-full border-b border-solid border-b-zinc-800 min-h-[51px] pr-[1625px] max-md:pr-5 max-md:max-w-full">
						<div className="flex flex-col grow shrink justify-center self-stretch py-4 pr-6 pl-6 my-auto w-12 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex bg-zinc-50 bg-opacity-10 min-h-[20px] w-[15px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto w-[108px] max-md:px-5">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[45px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[418px] max-md:px-5 max-md:max-w-full">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[193px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-8 py-4 my-auto w-[188px] max-md:px-5">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[78px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[248px] max-md:px-5">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[129px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] min-w-[240px] w-[238px] max-md:px-5">
							<div className="flex w-20 bg-zinc-50 bg-opacity-10 min-h-[20px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-3 py-3 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] w-[188px] max-md:px-5">
							<div className="flex items-center max-w-full w-[124px]">
								<div className="flex shrink-0 self-stretch my-auto rounded-full bg-zinc-50 bg-opacity-10 h-[27px] w-[27px]" />
								<div className="flex flex-col flex-1 shrink self-stretch pl-3 my-auto basis-0 min-h-[19px]">
									<div className="flex w-full bg-zinc-50 bg-opacity-10 min-h-[19px]" />
								</div>
							</div>
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto w-52 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex w-5 h-5 rounded-full bg-zinc-50 bg-opacity-10 min-h-[20px]" />
						</div>
					</div>
					<div className="flex flex-wrap justify-center items-center w-full border-b border-solid border-b-zinc-800 min-h-[51px] pr-[1625px] max-md:pr-5 max-md:max-w-full">
						<div className="flex flex-col grow shrink justify-center self-stretch py-4 pr-6 pl-6 my-auto w-12 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex bg-zinc-50 bg-opacity-10 min-h-[19px] w-[15px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto w-[108px] max-md:px-5">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[45px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[418px] max-md:px-5 max-md:max-w-full">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[193px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-8 py-4 my-auto w-[188px] max-md:px-5">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[78px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[248px] max-md:px-5">
							<div className="flex shrink-0 bg-zinc-50 bg-opacity-10 h-[19px] w-[129px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] min-w-[240px] w-[238px] max-md:px-5">
							<div className="flex w-20 bg-zinc-50 bg-opacity-10 min-h-[19px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-3 py-3 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] w-[188px] max-md:px-5">
							<div className="flex items-center max-w-full w-[124px]">
								<div className="flex shrink-0 self-stretch my-auto h-7 rounded-full bg-zinc-50 bg-opacity-10 w-[27px]" />
								<div className="flex flex-col flex-1 shrink self-stretch pl-3 my-auto basis-0 min-h-[19px]">
									<div className="flex w-full bg-zinc-50 bg-opacity-10 min-h-[20px]" />
								</div>
							</div>
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto w-52 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex w-5 h-5 rounded-full bg-zinc-50 bg-opacity-10 min-h-[20px]" />
						</div>
					</div>
					<div className="flex flex-wrap justify-center items-center w-full min-h-[51px] pr-[1625px] max-md:pr-5 max-md:max-w-full">
						<div className="flex flex-col grow shrink justify-center self-stretch py-4 pr-6 pl-6 my-auto w-12 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex bg-zinc-50 bg-opacity-10 min-h-[20px] w-[15px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto w-[108px] max-md:px-5">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[45px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[418px] max-md:px-5 max-md:max-w-full">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[193px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-8 py-4 my-auto w-[188px] max-md:px-5">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[78px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch px-6 py-4 my-auto border-r border-solid border-r-zinc-800 min-w-[240px] w-[248px] max-md:px-5">
							<div className="flex shrink-0 h-5 bg-zinc-50 bg-opacity-10 w-[129px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] min-w-[240px] w-[238px] max-md:px-5">
							<div className="flex w-20 bg-zinc-50 bg-opacity-10 min-h-[20px]" />
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-3 py-3 pr-6 pl-6 my-auto border-r border-solid border-r-zinc-800 min-h-[51px] w-[188px] max-md:px-5">
							<div className="flex items-center max-w-full w-[124px]">
								<div className="flex shrink-0 self-stretch my-auto rounded-full bg-zinc-50 bg-opacity-10 h-[27px] w-[27px]" />
								<div className="flex flex-col flex-1 shrink self-stretch pl-3 my-auto basis-0 min-h-[19px]">
									<div className="flex w-full bg-zinc-50 bg-opacity-10 min-h-[19px]" />
								</div>
							</div>
						</div>
						<div className="flex flex-col grow shrink justify-center items-start self-stretch py-4 pr-6 pl-6 my-auto w-52 border-r border-solid border-r-zinc-800 min-h-[51px] max-md:px-5">
							<div className="flex w-5 h-5 rounded-full bg-zinc-50 bg-opacity-10 min-h-[20px]" />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
