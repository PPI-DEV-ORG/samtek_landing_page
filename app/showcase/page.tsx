"use client";
import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  BellIcon,
  BoldIcon,
  CalendarIcon,
  ChevronRightIcon,
  DownloadIcon,
  FileTextIcon,
  HomeIcon,
  ImageIcon,
  InfoIcon,
  ItalicIcon,
  MailIcon,
  MicIcon,
  PaperclipIcon,
  PlusIcon,
  SearchIcon,
  SettingsIcon,
  SparklesIcon,
  StarIcon,
  TrashIcon,
  TriangleAlertIcon,
  UnderlineIcon,
  UserIcon,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Attachment,
  AttachmentActions,
  AttachmentAction,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Bubble, BubbleContent, BubbleGroup } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DirectionProvider } from "@/components/ui/direction";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Label } from "@/components/ui/label";
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageGroup,
} from "@/components/ui/message";
import {
  MessageScroller,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Progress } from "@/components/ui/progress";
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { Slider } from "@/components/ui/slider";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast, Toaster } from "@/components/ui/toast";
import { Toggle } from "@/components/ui/toggle";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--chart-1)" },
  mobile: { label: "Mobile", color: "var(--chart-2)" },
} satisfies ChartConfig;

const frameworks = ["Next.js", "React", "Vue", "Svelte", "Astro", "Remix"];

const invoices = [
  {
    invoice: "INV001",
    status: "Paid",
    method: "Credit Card",
    amount: "$250.00",
  },
  { invoice: "INV002", status: "Pending", method: "PayPal", amount: "$150.00" },
  {
    invoice: "INV003",
    status: "Unpaid",
    method: "Bank Transfer",
    amount: "$350.00",
  },
];

function useIsClient() {
  return React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

function MessageScrollerDemo() {
  const mounted = useIsClient();

  if (!mounted) return null;

  return (
    <MessageScrollerProvider>
      <MessageScroller>
        <MessageScrollerViewport>
          <MessageScrollerContent>
            {Array.from({ length: 6 }, (_, i) => (
              <MessageScrollerItem key={i}>Message {i + 1}</MessageScrollerItem>
            ))}
          </MessageScrollerContent>
        </MessageScrollerViewport>
      </MessageScroller>
    </MessageScrollerProvider>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="flex flex-col gap-6">{children}</div>
      <Separator />
    </section>
  );
}

export default function Home() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [commandOpen, setCommandOpen] = React.useState(false);

  React.useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setCommandOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  return (
    <TooltipProvider>
      <Toaster />
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-10 p-8">
        <header className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">
            shadcn/ui Component Showcase
          </h1>
          <p className="text-muted-foreground text-sm">
            Semua component yang ada di components/ui, ditampilkan dengan
            tampilan default-nya.
          </p>
        </header>

        <Section title="Button">
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button size="xs">Extra Small</Button>
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon">
              <PlusIcon />
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button disabled>Disabled</Button>
            <Button>
              <MailIcon /> With Icon
            </Button>
          </div>
        </Section>

        <Section title="Badge">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="ghost">Ghost</Badge>
            <Badge variant="link">Link</Badge>
          </div>
        </Section>

        <Section title="Alert">
          <Alert>
            <InfoIcon />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>
              This is a default alert with an icon.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <TriangleAlertIcon />
            <AlertTitle>Something went wrong</AlertTitle>
            <AlertDescription>This is a destructive alert.</AlertDescription>
            <AlertAction>
              <Button size="icon-sm" variant="ghost">
                <TrashIcon />
              </Button>
            </AlertAction>
          </Alert>
        </Section>

        <Section title="Avatar">
          <div className="flex flex-wrap items-center gap-4">
            <Avatar size="sm">
              <AvatarFallback>SM</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback>LG</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>
                <UserIcon />
              </AvatarFallback>
              <AvatarBadge />
            </Avatar>
          </div>
          <AvatarGroup>
            <Avatar>
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>B</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>C</AvatarFallback>
            </Avatar>
            <AvatarGroupCount>+3</AvatarGroupCount>
          </AvatarGroup>
        </Section>

        <Section title="Card">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>You have 3 unread messages.</CardDescription>
              <CardAction>
                <Button variant="ghost" size="icon-sm">
                  <SettingsIcon />
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p>Card content goes here.</p>
            </CardContent>
            <CardFooter>
              <Button>Mark all as read</Button>
            </CardFooter>
          </Card>
        </Section>

        <Section title="Accordion">
          <Accordion defaultValue={["item-1"]}>
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes, it adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes, it comes with default styles.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes, it is animated by default.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Section>

        <Section title="Tabs">
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="account">Account settings go here.</TabsContent>
            <TabsContent value="password">
              Password settings go here.
            </TabsContent>
            <TabsContent value="settings">
              General settings go here.
            </TabsContent>
          </Tabs>
        </Section>

        <Section title="Table">
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell>{invoice.invoice}</TableCell>
                  <TableCell>{invoice.status}</TableCell>
                  <TableCell>{invoice.method}</TableCell>
                  <TableCell>{invoice.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell>$750.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Section>

        <Section title="Progress, Skeleton & Spinner">
          <Progress value={45} />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <Spinner />
        </Section>

        <Section title="Aspect Ratio">
          <div className="w-64">
            <AspectRatio ratio={16 / 9}>
              <Skeleton className="h-full w-full" />
            </AspectRatio>
          </div>
        </Section>

        <Section title="Kbd">
          <KbdGroup>
            <Kbd>Ctrl</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>P</Kbd>
          </KbdGroup>
        </Section>

        <Section title="Breadcrumb">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbEllipsis />
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#">Components</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Section>

        <Section title="Pagination">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </Section>

        <Section title="Form Basics (Input, Textarea, Label, Field, Input Group, Native Select, Input OTP)">
          <FieldSet>
            <FieldLegend>Profile</FieldLegend>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input id="name" placeholder="Your name" />
                <FieldDescription>
                  This is your public display name.
                </FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="bio">Bio</FieldLabel>
                <Textarea id="bio" placeholder="Tell us about yourself" />
              </Field>
              <FieldSeparator>Or</FieldSeparator>
              <Field>
                <FieldLabel htmlFor="email-group">Email</FieldLabel>
                <InputGroup>
                  <InputGroupAddon>
                    <MailIcon />
                  </InputGroupAddon>
                  <InputGroupInput
                    id="email-group"
                    placeholder="you@example.com"
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton size="icon-xs">
                      <SearchIcon />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
              <Field>
                <FieldLabel htmlFor="country">Country</FieldLabel>
                <NativeSelect id="country">
                  <NativeSelectOption value="id">Indonesia</NativeSelectOption>
                  <NativeSelectOption value="us">
                    United States
                  </NativeSelectOption>
                  <NativeSelectOption value="sg">Singapore</NativeSelectOption>
                </NativeSelect>
              </Field>
              <Field data-invalid>
                <FieldLabel htmlFor="password">One-Time Password</FieldLabel>
                <InputOTP maxLength={6}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <FieldError errors={[{ message: "Code is invalid." }]} />
              </Field>
            </FieldGroup>
          </FieldSet>
        </Section>

        <Section title="Choice Inputs (Checkbox, Radio Group, Switch, Slider, Toggle, Toggle Group)">
          <div className="flex items-center gap-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>
          <RadioGroup defaultValue="comfortable">
            <div className="flex items-center gap-2">
              <RadioGroupItem value="default" id="r1" />
              <Label htmlFor="r1">Default</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="comfortable" id="r2" />
              <Label htmlFor="r2">Comfortable</Label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="compact" id="r3" />
              <Label htmlFor="r3">Compact</Label>
            </div>
          </RadioGroup>
          <div className="flex items-center gap-2">
            <Switch id="airplane-mode" />
            <Label htmlFor="airplane-mode">Airplane Mode</Label>
          </div>
          <Slider defaultValue={[50]} max={100} step={1} />
          <div className="flex flex-wrap items-center gap-2">
            <Toggle aria-label="Toggle bold">
              <BoldIcon />
            </Toggle>
            <Toggle variant="outline" aria-label="Toggle italic">
              <ItalicIcon />
            </Toggle>
          </div>
          <ToggleGroup multiple variant="outline">
            <ToggleGroupItem value="bold" aria-label="Toggle bold">
              <BoldIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="italic" aria-label="Toggle italic">
              <ItalicIcon />
            </ToggleGroupItem>
            <ToggleGroupItem value="underline" aria-label="Toggle underline">
              <UnderlineIcon />
            </ToggleGroupItem>
          </ToggleGroup>
        </Section>

        <Section title="Select & Combobox">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Vegetables</SelectLabel>
                <SelectItem value="carrot">Carrot</SelectItem>
                <SelectItem value="potato">Potato</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Combobox items={frameworks}>
            <ComboboxInput placeholder="Search framework..." />
            <ComboboxContent>
              <ComboboxEmpty>No results found.</ComboboxEmpty>
              <ComboboxList>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </Section>

        <Section title="Command">
          <div className="border">
            <Command>
              <CommandInput placeholder="Type a command or search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem>
                    <CalendarIcon />
                    <span>Calendar</span>
                  </CommandItem>
                  <CommandItem>
                    <SearchIcon />
                    <span>Search Emoji</span>
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Settings">
                  <CommandItem>
                    <UserIcon />
                    <span>Profile</span>
                    <CommandShortcut>⌘P</CommandShortcut>
                  </CommandItem>
                  <CommandItem>
                    <SettingsIcon />
                    <span>Settings</span>
                    <CommandShortcut>⌘S</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
          <p className="text-muted-foreground text-xs">
            Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> to open the command dialog.
          </p>
          <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  <CalendarIcon />
                  <span>Calendar</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </Section>

        <Section title="Calendar">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </Section>

        <Section title="Collapsible">
          <Collapsible>
            <CollapsibleTrigger render={<Button variant="outline" />}>
              Toggle details
            </CollapsibleTrigger>
            <CollapsibleContent>
              This content can be collapsed and expanded.
            </CollapsibleContent>
          </Collapsible>
        </Section>

        <Section title="Dialog, Alert Dialog, Sheet & Drawer">
          <div className="flex flex-wrap gap-2">
            <Dialog>
              <DialogTrigger render={<Button variant="outline" />}>
                Open Dialog
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <AlertDialog>
              <AlertDialogTrigger render={<Button variant="outline" />}>
                Open Alert Dialog
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Sheet>
              <SheetTrigger render={<Button variant="outline" />}>
                Open Sheet
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Edit profile</SheetTitle>
                  <SheetDescription>
                    Make changes to your profile here.
                  </SheetDescription>
                </SheetHeader>
                <SheetFooter>
                  <SheetClose render={<Button />}>Save changes</SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            <Drawer>
              <DrawerTrigger render={<Button variant="outline" />}>
                Open Drawer
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Edit profile</DrawerTitle>
                  <DrawerDescription>
                    Make changes to your profile here.
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>
                  <Button>Save changes</Button>
                  <DrawerClose render={<Button variant="outline" />}>
                    Cancel
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </Section>

        <Section title="Popover, Hover Card & Tooltip">
          <div className="flex flex-wrap items-center gap-2">
            <Popover>
              <PopoverTrigger render={<Button variant="outline" />}>
                Open Popover
              </PopoverTrigger>
              <PopoverContent>
                <PopoverHeader>
                  <PopoverTitle>Dimensions</PopoverTitle>
                  <PopoverDescription>
                    Set the dimensions for the layer.
                  </PopoverDescription>
                </PopoverHeader>
              </PopoverContent>
            </Popover>

            <HoverCard>
              <HoverCardTrigger render={<Button variant="link" />}>
                @shadcn
              </HoverCardTrigger>
              <HoverCardContent>
                The React Framework – created and maintained by Vercel.
              </HoverCardContent>
            </HoverCard>

            <Tooltip>
              <TooltipTrigger render={<Button variant="outline" />}>
                Hover me
              </TooltipTrigger>
              <TooltipContent>Add to library</TooltipContent>
            </Tooltip>
          </div>
        </Section>

        <Section title="Dropdown Menu, Context Menu & Menubar">
          <div className="flex flex-wrap items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger render={<Button variant="outline" />}>
                Open Menu
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Profile
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuCheckboxItem checked>
                    Show status bar
                  </DropdownMenuCheckboxItem>
                </DropdownMenuGroup>
                <DropdownMenuRadioGroup value="bottom">
                  <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="bottom">
                    Bottom
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>New Window</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Share</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>Edit</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>Undo</MenubarItem>
                  <MenubarItem>Redo</MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>

          <ContextMenu>
            <ContextMenuTrigger>
              <div className="flex h-24 w-full items-center justify-center border border-dashed text-sm">
                Right click here
              </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>
                Back <ContextMenuShortcut>⌘[</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>Forward</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>Reload</ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </Section>

        <Section title="Navigation Menu">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink href="#">Introduction</NavigationMenuLink>
                  <NavigationMenuLink href="#">Installation</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="#">Documentation</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </Section>

        <Section title="Resizable">
          <div className="h-48">
            <ResizablePanelGroup orientation="horizontal">
              <ResizablePanel defaultSize="50">
                <div className="flex h-full items-center justify-center">
                  One
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize="50">
                <div className="flex h-full items-center justify-center">
                  Two
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </Section>

        <Section title="Scroll Area">
          <ScrollArea className="h-32">
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i}>Line {i + 1}</p>
            ))}
          </ScrollArea>
        </Section>

        <Section title="Carousel">
          <div className="mx-auto max-w-xs">
            <Carousel>
              <CarouselContent>
                {Array.from({ length: 5 }, (_, i) => (
                  <CarouselItem key={i}>
                    <Card>
                      <CardContent>
                        <div className="flex aspect-square items-center justify-center">
                          <span className="text-3xl font-semibold">
                            {i + 1}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </Section>

        <Section title="Chart">
          <ChartContainer config={chartConfig}>
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
            </BarChart>
          </ChartContainer>
        </Section>

        <Section title="Sidebar">
          <div className="h-72 overflow-hidden border">
            <SidebarProvider defaultOpen>
              <Sidebar collapsible="none">
                <SidebarHeader>
                  <span className="px-2 text-sm font-semibold">Acme Inc</span>
                </SidebarHeader>
                <SidebarContent>
                  <SidebarGroup>
                    <SidebarGroupLabel>Platform</SidebarGroupLabel>
                    <SidebarGroupContent>
                      <SidebarMenu>
                        <SidebarMenuItem>
                          <SidebarMenuButton isActive>
                            <HomeIcon />
                            <span>Home</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                          <SidebarMenuButton>
                            <SettingsIcon />
                            <span>Settings</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenu>
                    </SidebarGroupContent>
                  </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <UserIcon />
                        <span>Account</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarFooter>
              </Sidebar>
              <SidebarInset>
                <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                  Page content
                </div>
              </SidebarInset>
            </SidebarProvider>
          </div>
        </Section>

        <Section title="Item, Empty, Marker & Button Group">
          <ItemGroup>
            <Item variant="outline">
              <ItemMedia variant="icon">
                <SparklesIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>New feature available</ItemTitle>
                <ItemDescription>
                  Check out what&apos;s new in this release.
                </ItemDescription>
              </ItemContent>
              <ItemActions>
                <Button size="sm" variant="outline">
                  View
                </Button>
              </ItemActions>
            </Item>
            <Item variant="muted">
              <ItemMedia variant="icon">
                <BellIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Notifications</ItemTitle>
                <ItemDescription>
                  You have 3 unread notifications.
                </ItemDescription>
              </ItemContent>
            </Item>
          </ItemGroup>

          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FileTextIcon />
              </EmptyMedia>
              <EmptyTitle>No documents yet</EmptyTitle>
              <EmptyDescription>
                Get started by creating a new document.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button size="sm">Create document</Button>
            </EmptyContent>
          </Empty>

          <Marker variant="separator">
            <MarkerContent>OR CONTINUE WITH</MarkerContent>
          </Marker>
          <Marker>
            <MarkerIcon>
              <StarIcon />
            </MarkerIcon>
            <MarkerContent>Featured item</MarkerContent>
          </Marker>

          <ButtonGroup>
            <Button variant="outline">Left</Button>
            <Button variant="outline">Middle</Button>
            <Button variant="outline">Right</Button>
          </ButtonGroup>
          <ButtonGroup>
            <ButtonGroupText>https://</ButtonGroupText>
            <Input placeholder="example.com" />
            <ButtonGroupSeparator />
            <Button variant="outline">Go</Button>
          </ButtonGroup>
        </Section>

        <Section title="Chat Kit (Message, Bubble, Attachment, Message Scroller)">
          <MessageGroup>
            <Message align="start">
              <MessageAvatar>
                <Avatar size="sm">
                  <AvatarFallback>AI</AvatarFallback>
                </Avatar>
              </MessageAvatar>
              <MessageContent>
                <BubbleGroup>
                  <Bubble variant="muted">
                    <BubbleContent>Hi! How can I help you today?</BubbleContent>
                  </Bubble>
                </BubbleGroup>
              </MessageContent>
            </Message>
            <Message align="end">
              <MessageContent>
                <BubbleGroup>
                  <Bubble align="end">
                    <BubbleContent>
                      Can you show me all shadcn components?
                    </BubbleContent>
                  </Bubble>
                </BubbleGroup>
              </MessageContent>
            </Message>
          </MessageGroup>

          <AttachmentGroup>
            <Attachment>
              <AttachmentMedia>
                <PaperclipIcon />
              </AttachmentMedia>
              <AttachmentContent>
                <AttachmentTitle>design-spec.pdf</AttachmentTitle>
                <AttachmentDescription>1.2 MB</AttachmentDescription>
              </AttachmentContent>
              <AttachmentActions>
                <AttachmentAction>
                  <DownloadIcon />
                </AttachmentAction>
              </AttachmentActions>
            </Attachment>
          </AttachmentGroup>

          <div className="h-40 border">
            <MessageScrollerDemo />
          </div>
        </Section>

        <Section title="Questionnaire">
          <Questionnaire>
            <QuestionnaireProgress />
            <QuestionnaireItem name="framework">
              <QuestionnaireTitle>
                What is your favorite framework?
              </QuestionnaireTitle>
              <QuestionnaireDescription>
                Choose one option below.
              </QuestionnaireDescription>
              <QuestionnaireChoices>
                <QuestionnaireChoice value="next">Next.js</QuestionnaireChoice>
                <QuestionnaireChoice value="react">React</QuestionnaireChoice>
                <QuestionnaireChoice value="vue">Vue</QuestionnaireChoice>
              </QuestionnaireChoices>
            </QuestionnaireItem>
            <QuestionnaireActions>
              <QuestionnairePrevious />
              <QuestionnaireNext />
            </QuestionnaireActions>
          </Questionnaire>
        </Section>

        <Section title="Toast">
          <Button
            variant="outline"
            onClick={() =>
              toast.add({
                title: "Event created",
                description: "Your event has been added to the calendar.",
              })
            }
          >
            Show Toast
          </Button>
        </Section>

        <Section title="Direction Provider (RTL)">
          <DirectionProvider direction="rtl">
            <div className="flex items-center gap-2 border p-4">
              <Button variant="outline">First</Button>
              <Button variant="outline">Second</Button>
              <ChevronRightIcon />
            </div>
          </DirectionProvider>
        </Section>

        <Section title="Icon Input (Mic)">
          <InputGroup>
            <InputGroupInput placeholder="Ask anything..." />
            <InputGroupAddon align="inline-end">
              <InputGroupButton size="icon-xs">
                <MicIcon />
              </InputGroupButton>
              <InputGroupButton size="icon-xs">
                <ImageIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </Section>
      </div>
    </TooltipProvider>
  );
}
