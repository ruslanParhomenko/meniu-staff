// "use client";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Label } from "@radix-ui/react-dropdown-menu";
// import SelectField from "@/components/inputs/SelectField";
// import { Form } from "@/components/ui/form";
// import { useForm, useWatch } from "react-hook-form";
// import { Button } from "@/components/ui/button";
// import { Delete } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useAbility } from "@/providers/AbilityProvider";
// import {
//   MENU_ITEMS_CUCINA,
//   PRODUCTS,
//   PRODUCTS_CUCINA,
// } from "../report/bar/constants";
// import { useTranslations } from "next-intl";
// import SelectFieldWithSearch from "@/components/inputs/SelectWithSearch";
// import toast from "react-hot-toast";
// import { formatNowData } from "@/utils/formatNow";

// type StopListItem = {
//   key: number;
//   product?: string;
//   date?: string;
// };

// type FormValues = {
//   stopList: StopListItem[];
//   stopListCucina: StopListItem[];
// };

// export default function TableStopListPrisma() {
//   const t = useTranslations("Navigation");
//   const { isObserver, isCucina, isAdmin, isBar } = useAbility();

//   const [recordId, setRecordId] = useState<number | null>(null);
//   const [saving, setSaving] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const defaultStopList: StopListItem[] = Array.from(
//     { length: 12 },
//     (_, i) => ({
//       key: i + 1,
//       product: "",
//       date: "",
//     })
//   );

//   const form = useForm<FormValues>({
//     defaultValues: { stopList: defaultStopList },
//   });

//   const stopListValues = useWatch({
//     control: form.control,
//     name: "stopList",
//   }) as StopListItem[];
//   const stopListCucinaValues = useWatch({
//     control: form.control,
//     name: "stopListCucina",
//   });
//   const saveData = async () => {
//     console.log(stopListCucinaValues);
//     try {
//       const payload = {
//         id: recordId,
//         stopList: stopListValues?.map(({ product, date }) => ({
//           product,
//           date,
//         })),
//         stopListCucina: stopListCucinaValues?.map(({ product, date }) => ({
//           product,
//           date,
//         })),
//       };

//       const res = await fetch("/api/stop-list", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) throw new Error("Ошибка сохранения");
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setSaving(false);
//     }
//   };
//   const clearSelect = (index: number) => {
//     if (isBar || isAdmin) {
//       form.setValue(`stopList.${index}`, {
//         ...stopListValues[index],
//         product: "",
//         date: "",
//       });
//     } else {
//       toast.error("Только БАР");
//       return;
//     }
//   };
//   const clearSelectCucina = (index: number) => {
//     if (isCucina || isAdmin) {
//       form.setValue(
//         `stopListCucina.${index}`,
//         {
//           ...stopListCucinaValues[index],
//           product: "",
//           date: "",
//         },
//         { shouldDirty: true }
//       );
//     } else {
//       toast.error("Только КУХНЯ");
//       return;
//     }
//   };

//   useEffect(() => {
//     const initRecord = async () => {
//       try {
//         const res = await fetch("/api/stop-list");
//         let data = await res.json();

//         if (!data) {
//           const createRes = await fetch("/api/stop-list", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               stopList: defaultStopList.map(({ product, date }) => ({
//                 product,
//                 date,
//               })),
//             }),
//           });

//           data = await createRes.json();
//         }

//         setRecordId(data.id);
//         form.reset({
//           stopList: data.stopList?.map((item: any, idx: number) => ({
//             key: idx + 1,
//             product: item.product,
//             date: item.date,
//           })),
//           stopListCucina: data.stopListCucina?.map(
//             (item: any, idx: number) => ({
//               key: idx + 1,
//               product: item.product,
//               date: item.date,
//             })
//           ),
//         });
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     initRecord();
//   }, [form]);

//   useEffect(() => {
//     stopListValues?.forEach((item, idx) => {
//       if (item && item.product && !item.date) {
//         form.setValue(`stopList.${idx}.date`, formatNowData());
//       }
//     });
//     stopListCucinaValues?.forEach((item, idx) => {
//       if (item && item.product && !item.date) {
//         form.setValue(`stopListCucina.${idx}.date`, formatNowData());
//       }
//     });
//   }, [stopListValues, form, stopListCucinaValues]);
//   const { isDirty } = form.formState;
//   useEffect(() => {
//     if (!isDirty || loading || !recordId) return;
//     setSaving(true);

//     const timeout = setTimeout(saveData, 500);
//     return () => clearTimeout(timeout);
//   }, [stopListValues, recordId, loading, stopListCucinaValues, isDirty]);

//   return (
//     <Form {...form}>
//       <form className="space-y-2">
//         <div className="grid md:grid-cols-2 ">
//           <div className="md:px-5">
//             <Label className="text-lg font-semibold pb-7">
//               {t("stopListBar")} {saving && "(Saving...)"}
//             </Label>
//             <Table className="[&_th]:text-center [&_td]:text-center ">
//               <TableHeader>
//                 <TableRow className="h-10 ">
//                   <TableCell>Product</TableCell>
//                   <TableCell>Date</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {stopListValues.map((item, idx) => (
//                   <TableRow key={item.key}>
//                     <TableCell>
//                       <SelectField
//                         data={PRODUCTS}
//                         fieldName={`stopList.${idx}.product`}
//                         disabled={isObserver || isCucina}
//                       />
//                     </TableCell>
//                     <TableCell>
//                       {item.product && <Label>{item.date}</Label>}
//                     </TableCell>
//                     <TableCell>
//                       {item.product && (
//                         <Button
//                           type="button"
//                           variant="destructive"
//                           onClick={() => clearSelect(idx)}
//                           disabled={isObserver}
//                         >
//                           <Delete />
//                         </Button>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//           <div className="md:px-5">
//             <Label className="text-lg font-semibold pb-7">
//               {t("stopListCucina")} {saving && "(Saving...)"}
//             </Label>
//             <Table className="[&_th]:text-center [&_td]:text-center ">
//               <TableHeader>
//                 <TableRow className="h-10 ">
//                   <TableCell>Product</TableCell>
//                   <TableCell>Date</TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {stopListCucinaValues?.map((item, idx) => (
//                   <TableRow key={item.key}>
//                     <TableCell>
//                       <SelectFieldWithSearch
//                         data={[...PRODUCTS_CUCINA, ...MENU_ITEMS_CUCINA]}
//                         fieldName={`stopListCucina.${idx}.product`}
//                         disabled={isObserver || isBar}
//                         className="!h-9"
//                       />
//                     </TableCell>
//                     <TableCell>
//                       {item.product && <Label>{item.date}</Label>}
//                     </TableCell>
//                     <TableCell>
//                       {item.product && (
//                         <Button
//                           type="button"
//                           variant="destructive"
//                           onClick={() => clearSelectCucina(idx)}
//                           disabled={isObserver}
//                         >
//                           <Delete />
//                         </Button>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         </div>
//       </form>
//     </Form>
//   );
// }
