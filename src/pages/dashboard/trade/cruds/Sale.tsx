import React from "react"
import { useNavigate } from "react-router-dom"
import { RemaindersDetail } from "~api/routes/remainders"
import Page from "~components/Page"
import Modal from "~components/ui/Modal"
import Button from "~elements/Button"
import useNavbars from "~hooks/redux/useNavbars"
import useBreakpoints from "~hooks/useBreakpoints"
import Trash from "~icons/Trash"
import AddProductModal from "../components/AddProductModal"
import DatePicker from "react-datepicker"
import Payment from "../components/Payment"
import { Controller, FormProvider, useFieldArray, useForm } from "react-hook-form"
import cls from "classnames"
import { yupResolver } from "@hookform/resolvers/yup"
import { SellBody, SellEditBody } from "~api/routes/trade"
import { TradeForm } from "~types/index"
import { convertDateTime, tradeFormValidationSchema } from "~utils/index"
import useLocationWithState from "~hooks/useLocationWithState"
import useTrade from "~hooks/redux/useTrade"
import Preloader from "~components/loaders/Preloader"
import Chevron from "~icons/Chevron"
import useTradePoints from "~hooks/redux/useTradePoints"

export type SaleState = {
  variant: "new" | "edit" | "preview"
  zakazId?: number
}

const Sale: React.FC = () => {
  const { isMobile } = useBreakpoints()

  const navigate = useNavigate()
  const { state } = useLocationWithState<SaleState>()
  const { variant, zakazId } = state || {}
  const { activeTradePoint } = useTradePoints()
  const {
    zakazInfo,
    getZakazInfo,
    loading,
    dateRange,
    getSales,
    createSale,
    editSale,
    salePaymentTabIndex,
    setSalePaymentTabIndex
  } = useTrade()

  React.useEffect(() => {
    if (variant !== "new" && zakazId) getZakazInfo(zakazId)
  }, [variant, zakazId])

  const goBack = () => navigate(-1)

  const { headerTitle } = useNavbars({
    headerTitle: variant === "new" ? "Новая продажа" : `Чек №${zakazInfo?.head?.recId}`
  })

  const [showAddProductModal, setShowProductModal] = React.useState<boolean>(false)
  const toggleShowProductModal = (show: boolean) => () => setShowProductModal(show)

  const [showPaymentModal, setShowPaymentModal] = React.useState<boolean>(false)
  const toggleShowPaymentModal = (show: boolean) => () => setShowPaymentModal(show)

  const methods = useForm<TradeForm>({
    resolver: yupResolver(tradeFormValidationSchema),
    defaultValues: {
      date: new Date(),
      discount: "0",
      details: [],
      summCash: 0,
      summNoncash: 0,
      summBonus: 0
    },
    mode: "onChange"
  })

  const { control, handleSubmit, watch, setValue } = methods

  React.useEffect(() => {
    if (variant !== "new" && zakazInfo) {
      const { head, details } = zakazInfo
      setValue("date", new Date(head.date))
      setValue(
        "details",
        details.map<RemaindersDetail>(d => ({
          gProductId: d.gProductId,
          remaindersId: d.gProductId,
          amount: d.amount,
          cost: d.price,
          name: d.name,
          groupName: d.name
        }))
      )
      setValue("summCash", head.summCash)
      setValue("summNoncash", head.summNoncash)
      setValue("summBonus", head.summBonus)
    }
  }, [zakazInfo, variant])

  const { fields, append, remove } = useFieldArray({ control, name: "details" })
  const [discount, details] = watch(["discount", "details"])
  const [summCash, summNoncash, summBonus] = watch(["summCash", "summNoncash", "summBonus"])

  const controlledFields = fields.map((field, index) => ({ ...field, ...details[index] }))

  const onSelectProduct = (detail: RemaindersDetail) => append({ ...detail, amount: 1 })
  const onDeleteProduct = (index: number) => () => remove(index)

  const discontMultiplier = React.useMemo(() => (100 - Number(discount)) * 0.01, [discount])
  const summ = React.useMemo(
    () =>
      controlledFields.reduce((acc, { amount, cost }) => acc + amount * cost, 0) *
      (variant === "new" ? discontMultiplier : 1),
    [controlledFields, discontMultiplier, variant]
  )

  const onSubmit = (form: TradeForm) => {
    const body: SellBody = {
      gTochkaId: activeTradePoint?.gTochkaId || 0,
      gProducts: form.details.map(({ gProductId, amount, cost }) => ({
        gProductId,
        amount,
        cost: cost * discontMultiplier
      })),
      summ,
      summCash: form.summCash,
      summNoncash: form.summNoncash,
      summBonus: form.summBonus,
      date: convertDateTime(form.date)
    }
    const { gTochkaId, ...sell } = body
    const editBody: SellEditBody = {
      zakazId: zakazId || 0,
      ...sell
    }

    console.log(body)

    if (variant === "new")
      createSale(body).then(() => {
        getSales({ gtochkaid: gTochkaId, ...dateRange })
        goBack()
      })
    else
      editSale(editBody).then(() => {
        getSales({ gtochkaid: gTochkaId, ...dateRange })
        goBack()
      })
  }

  if (loading) return <Preloader />

  return (
    <Page title={headerTitle}>
      {!isMobile && (
        <div className="flex items-center">
          <button onClick={goBack} className="flex items-center text-primary-blue hover:text-bg-primary">
            <Chevron className="transform rotate-180 w-3 h-3" />
            <p className="label-15 ml-2">Назад</p>
          </button>
          <p className={"title-20 ml-5"}>{headerTitle}</p>
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:mt-5">
        <div className="flex flex-col bg-bg-secondary sm:order-last">
          <div
            className={cls("grid grid-cols-2 gap-4 p-4", {
              "!grid-cols-1": variant !== "new"
            })}
          >
            <div className="flex-1">
              <p className="text-gray-2 font-semibold text-center">Дата:</p>
              <Controller
                control={control}
                name="date"
                render={({ field: { value, onChange, ...rest } }) => (
                  <DatePicker
                    selected={value}
                    onChange={onChange}
                    dateFormat="dd.MM.yyyy"
                    disabled={variant === "preview"}
                    customInput={
                      <input
                        className="mt-2 bg-transparent w-full border-b border-primary-blue text-primary-blue text-center font-bold"
                        {...rest}
                      />
                    }
                  />
                )}
              />
            </div>
            {variant === "new" && (
              <div className="flex-1">
                <p className="text-gray-2 font-semibold text-center">Скидка в %</p>
                <Controller
                  control={control}
                  name="discount"
                  render={({ field, fieldState: { error } }) => (
                    <input
                      className={cls(
                        "mt-2 bg-transparent w-full border-b border-primary-blue text-primary-blue text-center font-bold",
                        {
                          "border-danger": !!error
                        }
                      )}
                      {...field}
                    />
                  )}
                />
              </div>
            )}
          </div>
          <div className="p-4 border-t border-dashed border-bg-separator">
            <div className="flex items-center justify-between">
              <p className="label-15 text-gray-2">Сумма:</p>
              <p className="label-15 text-primary-blue">{summ.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between mt-1">
              <p className="label-15 text-gray-2">Оплачено:</p>
              <p className="label-15 text-primary-blue">{(zakazInfo?.head.payedSumm || 0).toFixed(2)}</p>
            </div>

            <div className="flex items-center justify-between mt-4">
              <p className="label-15 text-gray-2">Наличными:</p>
              <p className="label-15 text-primary-blue">{(Number(summCash) || 0).toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between mt-1">
              <p className="label-15 text-gray-2">Безналичными:</p>
              <p className="label-15 text-primary-blue">{(Number(summNoncash) || 0).toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between mt-1">
              <p className="label-15 text-gray-2">Бонусами:</p>
              <p className="label-15 text-primary-blue">{(Number(summBonus) || 0).toFixed(2)}</p>
            </div>

            {variant !== "preview" && (
              <FormProvider {...methods}>
                {isMobile ? (
                  <Modal open={showPaymentModal} onClose={toggleShowPaymentModal(false)}>
                    <p className="volume-22 text-center text-primary-blue">Оплата</p>

                    <Payment tabIndex={salePaymentTabIndex} setTabIndex={setSalePaymentTabIndex} />
                    <div className="mt-5 flex">
                      <Button className="mr-1" onClick={toggleShowPaymentModal(false)}>
                        Отменить
                      </Button>
                      <Button className="primary ml-1" onClick={handleSubmit(onSubmit)}>
                        Сохранить
                      </Button>
                    </div>
                  </Modal>
                ) : (
                  <Payment tabIndex={salePaymentTabIndex} setTabIndex={setSalePaymentTabIndex} />
                )}
              </FormProvider>
            )}

            {variant !== "preview" && (
              <div className="mt-5 flex">
                <Button className="mr-1" onClick={goBack}>
                  Отменить
                </Button>
                <Button
                  className="primary ml-1"
                  onClick={isMobile ? toggleShowPaymentModal(true) : handleSubmit(onSubmit)}
                >
                  Сохранить
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="px-4 py-2 sm:py-0 lg:col-span-2">
          <div className="flex items-end sm:mb-3">
            {!isMobile && <p className="volume-17">Список товаров:</p>}
            {variant !== "preview" && (
              <Button className="sm:w-auto sm:ml-auto" onClick={toggleShowProductModal(true)}>
                Добавить товар
              </Button>
            )}
          </div>

          {controlledFields.map((item, index) => (
            <div key={item.gProductId} className="flex items-center">
              <div className="flex-1 my-2 grid grid-cols-4 items-center justify-center border border-bg-separator text-primary-blue">
                <p className="col-span-2 p-2 truncate">{item.name}</p>
                <div className="text-center border-l border-bg-separator p-2">
                  <Controller
                    key={item.id}
                    control={control}
                    name={`details.${index}.amount`}
                    render={({ field, fieldState: { error } }) => (
                      <input
                        disabled={variant === "preview"}
                        className={cls("text-center w-full border-b border-primary-blue", {
                          "border-danger": !!error,
                          "border-none": variant === "preview"
                        })}
                        {...field}
                      />
                    )}
                  />
                </div>
                <div className="text-center border-l border-bg-separator p-2">
                  <Controller
                    key={item.id}
                    control={control}
                    name={`details.${index}.cost`}
                    render={({ field, fieldState: { error } }) => (
                      <input
                        disabled={variant === "preview"}
                        className={cls("text-center w-full border-b border-primary-blue", {
                          "border-danger": !!error,
                          "border-none": variant === "preview"
                        })}
                        {...field}
                      />
                    )}
                  />
                </div>
              </div>
              {variant !== "preview" && (
                <button className="px-2" title="Удалить" onClick={onDeleteProduct(index)}>
                  <Trash className="w-5 h-5 text-danger" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <Modal open={showAddProductModal} onClose={toggleShowProductModal(false)}>
        <AddProductModal onSelect={onSelectProduct} onClose={toggleShowProductModal(false)} />
      </Modal>
    </Page>
  )
}

export default Sale
